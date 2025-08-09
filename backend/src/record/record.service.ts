import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { JwtHelper } from 'src/auth/auth.helper';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { WorkerService } from 'src/worker/worker.service';
import { MassUpdateRecordsDTO, UpdateRecordDTO } from './record.dto';

@Injectable()
export class RecordService {
  private readonly logger = new Logger(RecordService.name);

  private readonly actions = {
    CREATED: 'CREATED',
    EDITED: 'EDITED',
    DELETED: 'DELETED',
  } as const;

  constructor(
    private readonly prisma: PrismaService,
    private readonly product: ProductService,
    private readonly worker: WorkerService,
    private jwtService: JwtService,
  ) {}

  static getLocaltime() {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - timezoneOffset).toISOString();
  }

  defineActor(request: FastifyRequest) {
    const token = JwtHelper.extractTokenFromHeader(request);
    const actor = this.jwtService.decode<{ sub: string } | undefined>(
      token ?? '',
    )?.sub;

    if (!actor)
      throw new HttpException(
        `Что-то пошло не так. Токен не найден!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return actor;
  }

  async getRecords() {
    this.logger.log('Fetching all records');
    const records = await this.prisma.record.findMany({
      where: { isDeleted: false },
      include: { edits: true },
      omit: { isDeleted: true },
      orderBy: { id: 'asc' },
    });

    return JSON.stringify(
      records.map(({ edits, ...rest }) => ({
        ...rest,
        editedAt: edits[edits.length - 1].changedAt,
        editedBy: edits[edits.length - 1].changedBy,
      })),
    );
  }

  async getRecordByID(id: number) {
    this.logger.debug(`Looking up record ID: ${id}`);
    const foundRecord = await this.prisma.record.findUnique({ where: { id } });
    if (!foundRecord) {
      this.logger.warn(`Record not found: ID ${id}`);
      throw new HttpException(
        `Запись с номером ${id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundRecord;
  }

  async createRecord(
    recordData: {
      workerID: number;
      productCode: string;
      amount: number;
    },
    request: FastifyRequest,
  ) {
    const creator = this.defineActor(request);

    this.logger.debug(
      `Creating record for worker ${recordData.workerID} and product ${recordData.productCode} by ${creator}`,
    );

    await this.product.getProductByCode(recordData.productCode);
    await this.worker.getWorkerByID(recordData.workerID);

    const localISOTime = RecordService.getLocaltime();

    this.logger.verbose(`Using local time: ${localISOTime}`);

    const savedRecord = await this.prisma.record.create({
      data: {
        ...recordData,
        createdBy: creator,
        createdAt: localISOTime,
      },
      omit: { isDeleted: true },
    });

    const recordChange = await this.prisma.recordChange.create({
      data: {
        ...recordData,
        recordId: savedRecord.id,
        action: this.actions.CREATED,
        changedBy: creator,
        changedAt: localISOTime,
      },
    });

    this.logger.log(`Record created successfully: ID ${savedRecord.id}`);
    return JSON.stringify({
      ...savedRecord,
      editedAt: recordChange.changedAt,
      editedBy: recordChange.changedBy,
    });
  }

  async updateRecord(
    recordData: UpdateRecordDTO,
    request: FastifyRequest,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    const editor = this.defineActor(request);
    this.logger.warn(
      `Обновление записи ID: ${recordData.id} пользователем ${editor}`,
    );

    if (recordData.productCode) {
      this.logger.debug(`Проверка кода продукта: ${recordData.productCode}`);
      await this.product.getProductByCode(recordData.productCode);
    }
    if (recordData.workerID) {
      this.logger.debug(`Проверка ID работника: ${recordData.workerID}`);
      await this.worker.getWorkerByID(recordData.workerID);
    }

    const foundRecord = await this.getRecordByID(recordData.id);
    if (!foundRecord) {
      this.logger.error(
        `Обновление не удалось: запись ID ${recordData.id} не найдена`,
      );
      throw new HttpException(
        `Запись с ID ${recordData.id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const { id, ...rest } = recordData;

    const updatedRecord = await client.record.update({
      where: { id },
      data: rest,
    });
    this.logger.log(`Запись успешно обновлена: ID ${id}`);

    const { changedAt, changedBy } = await client.recordChange.create({
      data: {
        ...rest,
        recordId: updatedRecord.id,
        action: this.actions.EDITED,
        changedBy: editor,
        changedAt: RecordService.getLocaltime(),
      },
    });

    return { ...updatedRecord, editedBy: changedBy, editedAt: changedAt };
  }

  async deleteRecord(
    id: number,
    request: FastifyRequest,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    const remover = this.defineActor(request);
    this.logger.warn(`${remover} пытается удалить запись с ID: ${id}`);

    const foundRecord = await client.record.findUnique({ where: { id } });
    if (!foundRecord) {
      this.logger.error(`Удаление не удалось: запись ID ${id} не найдена`);
      throw new HttpException(
        `Запись с ID ${id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const record = await client.record.update({
      where: { id },
      select: { amount: true, productCode: true, workerID: true },
      data: { isDeleted: true },
    });

    await client.recordChange.create({
      data: {
        ...record,
        recordId: id,
        changedBy: remover,
        changedAt: RecordService.getLocaltime(),
        action: this.actions.DELETED,
      },
    });

    this.logger.log(`Запись успешно удалена: ID ${id}`);
    return 'Success!';
  }

  async massUpdateRecords(
    records: MassUpdateRecordsDTO['records'],
    request: FastifyRequest,
  ) {
    return this.prisma.$transaction(async (tx) => {
      for await (const { isDeleted, ...record } of records) {
        if (isDeleted) {
          await this.deleteRecord(record.id, request, tx);
        } else {
          await this.updateRecord(record, request, tx);
        }
      }
      this.logger.log(
        `Массовое обновление завершено пользователем ${this.defineActor(request)}`,
      );
      return 'Success!';
    });
  }
}

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  async updateRecord(recordData: UpdateRecordDTO, request: FastifyRequest) {
    const editor = this.defineActor(request);

    this.logger.warn(`Updating record ID: ${recordData.id} by ${editor}`);

    if (recordData.productCode) {
      this.logger.debug(`Validating product code: ${recordData.productCode}`);
      await this.product.getProductByCode(recordData.productCode);
    }

    if (recordData.workerID) {
      this.logger.debug(`Validating worker ID: ${recordData.workerID}`);
      await this.worker.getWorkerByID(recordData.workerID);
    }

    const foundRecord = await this.getRecordByID(recordData.id);

    const { id, amount, productCode, workerID } = foundRecord;

    const updatedRecord = await this.prisma.record.update({
      where: { id: recordData.id },
      data: {
        id,
        amount: recordData.amount ?? amount,
        productCode: recordData.productCode ?? productCode,
        workerID: recordData.workerID ?? workerID,
      },
    });

    const recordChange = await this.prisma.recordChange.create({
      data: {
        ...recordData,
        recordId: updatedRecord.id,
        action: this.actions.EDITED,
        changedBy: editor,
        changedAt: RecordService.getLocaltime(),
      },
    });

    this.logger.log(`Record updated successfully: ID ${updatedRecord.id}`);
    return JSON.stringify({
      ...updatedRecord,
      editedAt: recordChange.changedAt,
      editedBy: recordChange.changedBy,
    });
  }

  async massUpdateRecords(
    records: MassUpdateRecordsDTO['records'],
    request: FastifyRequest,
  ) {
    await Promise.all(
      records.map(async (record) => {
        if (record.productCode)
          await this.product.getProductByCode(record.productCode);
        if (record.workerID) await this.worker.getWorkerByID(record.workerID);
        await this.getRecordByID(record.id);
      }),
    );

    const editor = this.defineActor(request);

    return this.prisma.$transaction(async (tx) => {
      const updates = records.map(async (record) => {
        const { id, ...rest } = record;
        this.logger.warn(`Updating record ID: ${id} by ${editor}`);

        await tx.record.update({
          where: { id },
          data: rest,
        });

        return tx.recordChange.create({
          data: {
            ...rest,
            recordId: id,
            changedBy: editor,
            changedAt: RecordService.getLocaltime(),
            action: this.actions.EDITED,
          },
        });
      });
      await Promise.all(updates);
      return 'Success!';
    });
  }

  async deleteRecord(id: number, request: FastifyRequest) {
    const remover = this.defineActor(request);
    this.logger.warn(`${remover} attemptes deleting record with ID: ${id}`);
    const foundRecord = await this.prisma.record.findUnique({ where: { id } });

    if (!foundRecord) {
      this.logger.error(`Delete failed: record ID ${id} not found`);
      throw new HttpException(
        `Запись с номером ${id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }
    const record = await this.prisma.record.update({
      where: { id },
      select: { amount: true, productCode: true, workerID: true },
      data: { isDeleted: true },
    });

    await this.prisma.recordChange.create({
      data: {
        ...record,
        recordId: id,
        changedBy: remover,
        action: this.actions.DELETED,
      },
    });
    this.logger.log(`Record deleted successfully: ID ${id}`);
    return 'Success!';
  }
}

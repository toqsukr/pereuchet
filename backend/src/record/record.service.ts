import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { WorkerService } from 'src/worker/worker.service';

@Injectable()
export class RecordService {
  private readonly logger = new Logger(RecordService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly product: ProductService,
    private readonly worker: WorkerService,
  ) {}

  async getRecords() {
    this.logger.log('Fetching all records');
    const records = await this.prisma.record.findMany();
    return JSON.stringify(records);
  }

  async getRecordByID(id: number) {
    this.logger.debug(`Looking up record ID: ${id}`);
    const foundRecord = await this.prisma.record.findUnique({ where: { id } });
    if (!foundRecord) {
      this.logger.warn(`Record not found: ID ${id}`);
      throw new HttpException(
        `Record by id ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundRecord;
  }

  async createRecord(recordData: {
    workerID: number;
    productCode: string;
    amount: number;
  }) {
    this.logger.debug(
      `Creating record for worker ${recordData.workerID} and product ${recordData.productCode}`,
    );

    await this.product.getProductByCode(recordData.productCode);
    await this.worker.getWorkerByID(recordData.workerID);

    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(
      date.getTime() - timezoneOffset,
    ).toISOString();

    this.logger.verbose(`Using local time: ${localISOTime}`);

    const savedRecord = await this.prisma.record.create({
      data: {
        ...recordData,
        date: localISOTime,
      },
    });
    this.logger.log(`Record created successfully: ID ${savedRecord.id}`);
    return JSON.stringify(savedRecord);
  }

  async updateRecord(recordData: {
    id: number;
    workerID?: number;
    productCode?: string;
    amount?: number;
  }) {
    this.logger.warn(`Updating record ID: ${recordData.id}`);

    if (recordData.productCode) {
      this.logger.debug(`Validating product code: ${recordData.productCode}`);
      await this.product.getProductByCode(recordData.productCode);
    }

    if (recordData.workerID) {
      this.logger.debug(`Validating worker ID: ${recordData.workerID}`);
      await this.worker.getWorkerByID(recordData.workerID);
    }

    const foundRecord = await this.getRecordByID(recordData.id);

    const { id, date, amount, productCode, workerID } = foundRecord;
    const updatedRecord = await this.prisma.record.update({
      where: { id: recordData.id },
      data: {
        id,
        date,
        amount: recordData.amount ?? amount,
        productCode: recordData.productCode ?? productCode,
        workerID: recordData.workerID ?? workerID,
      },
    });
    this.logger.log(`Record updated successfully: ID ${updatedRecord.id}`);
    return JSON.stringify(updatedRecord);
  }

  async deleteRecord(id: number) {
    this.logger.warn(`Attempting to delete record ID: ${id}`);
    const foundRecord = await this.prisma.record.findUnique({ where: { id } });
    if (!foundRecord) {
      this.logger.error(`Delete failed: record ID ${id} not found`);
      throw new HttpException(
        `Record by id ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.prisma.record.delete({ where: { id } });
    this.logger.log(`Record deleted successfully: ID ${id}`);
    return 'Success!';
  }
}

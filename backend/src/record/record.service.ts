import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { WorkerService } from 'src/worker/worker.service';

@Injectable()
export class RecordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly product: ProductService,
    private readonly worker: WorkerService,
  ) {}

  async getRecords() {
    const records = await this.prisma.record.findMany();
    return JSON.stringify(records);
  }

  async getRecordByID(id: number) {
    const foundRecord = await this.prisma.record.findUnique({ where: { id } });
    if (!foundRecord) {
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
    await this.product.getProductByCode(recordData.productCode);
    await this.worker.getWorkerByID(recordData.workerID);

    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(
      date.getTime() - timezoneOffset,
    ).toISOString();

    const savedRecord = await this.prisma.record.create({
      data: {
        ...recordData,
        date: localISOTime,
      },
    });
    return JSON.stringify(savedRecord);
  }

  async updateRecord(recordData: {
    id: number;
    workerID?: number;
    productCode?: string;
    amount?: number;
  }) {
    if (recordData.productCode) {
      await this.product.getProductByCode(recordData.productCode);
    }

    if (recordData.workerID) {
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
    return JSON.stringify(updatedRecord);
  }

  async deleteRecord(id: number) {
    const foundRecord = await this.prisma.record.findUnique({ where: { id } });
    if (!foundRecord) {
      throw new HttpException(
        `Record by id ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.prisma.record.delete({ where: { id } });
    return 'OK';
  }
}

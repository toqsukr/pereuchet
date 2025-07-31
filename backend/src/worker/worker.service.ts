import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkerDTO, UpdateWorkerDTO } from './worker.dto';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getWorkerByID(id: number) {
    this.logger.debug(`Fetching worker by ID: ${id}`);
    const foundWorker = await this.prisma.worker.findUnique({ where: { id } });

    if (!foundWorker) {
      this.logger.warn(`Worker not found: ID ${id}`);
      throw new HttpException(
        `Штамповщик с номером ${id} не найден!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundWorker;
  }

  async getWorkers() {
    this.logger.log('Fetching all workers');
    const workers = (await this.prisma.worker.findMany()).sort(
      (a, b) => a.id - b.id,
    );
    return JSON.stringify(workers);
  }

  async createWorker(workerData: CreateWorkerDTO) {
    this.logger.debug(`Creating worker: ${JSON.stringify(workerData)}`);
    return this.prisma.worker.create({ data: workerData });
  }

  async updateWorker(workerData: UpdateWorkerDTO) {
    this.logger.warn(`Updating worker ID ${workerData.id}`);
    return this.prisma.worker.update({
      where: { id: workerData.id },
      data: workerData,
    });
  }

  async deleteWorker(id: number) {
    this.logger.warn(`Deleting worker ID: ${id}`);
    await this.prisma.worker.delete({ where: { id } });
    return 'Success!';
  }
}

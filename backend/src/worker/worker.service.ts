import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkerService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkerByID(id: number) {
    const foundWorker = await this.prisma.worker.findUnique({
      where: { id },
    });

    if (!foundWorker) {
      throw new HttpException(
        `Worker by id ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundWorker;
  }

  async getWorkers() {
    const workers = await this.prisma.worker.findMany();
    return JSON.stringify(workers);
  }
}

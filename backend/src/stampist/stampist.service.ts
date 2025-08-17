import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { JwtHelper } from 'src/auth/auth.helper';
import { PrismaService } from 'src/prisma.service';
import {
  CreateStampistDTO,
  MassUpdateStampist,
  UpdateStampistDTO,
} from './stampist.dto';

@Injectable()
export class StampistService {
  private readonly logger = new Logger(StampistService.name);
  private readonly jwtHelper = new JwtHelper();

  constructor(private readonly prisma: PrismaService) {}

  async getStampistByID(id: number) {
    this.logger.debug(`Fetching stampist by ID: ${id}`);
    const foundStampist = await this.prisma.stampist.findUnique({
      where: { id },
    });

    if (!foundStampist) {
      this.logger.warn(`Stampist not found: ID ${id}`);
      throw new HttpException(
        `Штамповщик с номером ${id} не найден!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundStampist;
  }

  async getStampists() {
    this.logger.log('Fetching all stampists');
    const stampists = await this.prisma.stampist.findMany({
      orderBy: { id: 'asc' },
    });
    return JSON.stringify(stampists);
  }

  async createStampist(stampistData: CreateStampistDTO) {
    this.logger.debug(`Creating stampist: ${JSON.stringify(stampistData)}`);
    return this.prisma.stampist.create({ data: stampistData });
  }

  async updateStampist(
    stampistData: UpdateStampistDTO,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    this.logger.warn(`Updating stampist ID ${stampistData.id}`);
    return client.stampist.update({
      where: { id: stampistData.id },
      data: stampistData,
    });
  }

  async massUpdateStampist(
    stampists: MassUpdateStampist[],
    request: FastifyRequest,
  ) {
    return this.prisma.$transaction(async (tx) => {
      for await (const { isDeleted, ...stampist } of stampists) {
        if (isDeleted) {
          await this.deleteStampist(stampist.id, tx);
        } else {
          await this.updateStampist(stampist, tx);
        }
      }
      this.logger.log(
        `Массовое обновление штамповщиков пользователем ${this.jwtHelper.defineActor(request)}`,
      );
      return 'Success!';
    });
  }

  async deleteStampist(id: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    this.logger.warn(`Deleting stampist ID: ${id}`);
    await client.stampist.delete({ where: { id } });
    return 'Success!';
  }
}

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { JwtHelper } from 'src/auth/auth.helper';
import { PrismaService } from 'src/prisma.service';
import { CreateTreadDTO, MassUpdateTread, UpdateTreadDTO } from './tread.dto';

@Injectable()
export class TreadService {
  private readonly logger = new Logger(TreadService.name);
  private readonly jwtHelper = new JwtHelper();

  constructor(private readonly prisma: PrismaService) {}

  async getTreadByCode(code: string) {
    this.logger.debug(`Looking up tread by code: ${code}`);
    const foundTread = await this.prisma.tread.findUnique({
      where: { code },
    });

    if (!foundTread) {
      this.logger.warn(`Tread not found: ${code}`);
      throw new HttpException(
        `Продукт с кодом ${code} не найден!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return foundTread;
  }

  async getTreads() {
    this.logger.log('Fetching all treads');
    const treads = await this.prisma.tread.findMany({
      orderBy: { name: 'asc' },
    });
    return JSON.stringify(treads);
  }

  async createTread(treadData: CreateTreadDTO) {
    this.logger.debug(`Creating tread: ${treadData.code}`);
    await this.prisma.tread.create({ data: treadData });
    this.logger.log(`Tread created: ${treadData.code}`);
    return 'Success!';
  }

  async updateTread(treadData: UpdateTreadDTO, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    this.logger.warn(`Updating tread: ${treadData.code}`);
    await client.tread.update({
      where: { code: treadData.code },
      data: treadData,
    });
    this.logger.log(`Tread updated: ${treadData.code}`);
    return 'Success!';
  }

  async massUpdateTread(treads: MassUpdateTread[], request: FastifyRequest) {
    return this.prisma.$transaction(async (tx) => {
      for await (const { isDeleted, ...tread } of treads) {
        if (isDeleted) {
          await this.deleteTread(tread.code, tx);
        } else {
          await this.updateTread(tread, tx);
        }
      }
      this.logger.log(
        `Массовое обновление подошв пользователем ${this.jwtHelper.defineActor(request)}`,
      );
      return 'Success!';
    });
  }

  async deleteTread(code: string, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    this.logger.warn(`Deleting tread: ${code}`);
    await client.tread.delete({ where: { code } });
    this.logger.log(`Tread deleted: ${code}`);
    return 'Success!';
  }
}

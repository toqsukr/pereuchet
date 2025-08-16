import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTreadDTO, UpdateTreadDTO } from './tread.dto';

@Injectable()
export class TreadService {
  private readonly logger = new Logger(TreadService.name);

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

  async updateTread(treadData: UpdateTreadDTO) {
    this.logger.warn(`Updating tread: ${treadData.code}`);
    await this.prisma.tread.update({
      where: { code: treadData.code },
      data: treadData,
    });
    this.logger.log(`Tread updated: ${treadData.code}`);
    return 'Success!';
  }

  async deleteTread(code: string) {
    this.logger.warn(`Deleting tread: ${code}`);
    await this.prisma.tread.delete({ where: { code } });
    this.logger.log(`Tread deleted: ${code}`);
    return 'Success!';
  }
}

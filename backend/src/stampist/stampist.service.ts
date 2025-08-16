import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateStampistDTO, UpdateStampistDTO } from './stampist.dto';

@Injectable()
export class StampistService {
  private readonly logger = new Logger(StampistService.name);

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

  async updateStampist(stampistData: UpdateStampistDTO) {
    this.logger.warn(`Updating stampist ID ${stampistData.id}`);
    return this.prisma.stampist.update({
      where: { id: stampistData.id },
      data: stampistData,
    });
  }

  async deleteStampist(id: number) {
    this.logger.warn(`Deleting stampist ID: ${id}`);
    await this.prisma.stampist.delete({ where: { id } });
    return 'Success!';
  }
}

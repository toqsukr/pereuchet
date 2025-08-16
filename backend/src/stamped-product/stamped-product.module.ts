import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { StampistService } from 'src/stampist/stampist.service';
import { TreadService } from 'src/tread/tread.service';
import { StampedProductController } from './stamped-product.controller';
import { StampedProductService } from './stamped-product.service';

@Module({
  imports: [],
  controllers: [StampedProductController],
  providers: [
    StampedProductService,
    PrismaService,
    StampistService,
    TreadService,
    JwtService,
  ],
})
export class StampedProductModule {}

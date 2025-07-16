import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { WorkerService } from 'src/worker/worker.service';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [],
  controllers: [RecordController],
  providers: [
    RecordService,
    PrismaService,
    WorkerService,
    ProductService,
    JwtService,
  ],
})
export class RecordModule {}

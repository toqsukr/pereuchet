import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { WorkerService } from 'src/worker/worker.service';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [],
  controllers: [RecordController],
  providers: [RecordService, PrismaService, WorkerService, ProductService],
})
export class RecordModule {}

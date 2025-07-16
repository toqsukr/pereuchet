import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [],
  controllers: [WorkerController],
  providers: [WorkerService, PrismaService, JwtService],
})
export class WorkerModule {}

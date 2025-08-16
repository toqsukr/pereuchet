import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { TreadController } from './tread.controller';
import { TreadService } from './tread.service';

@Module({
  imports: [],
  controllers: [TreadController],
  providers: [TreadService, PrismaService, JwtService],
})
export class TreadModule {}

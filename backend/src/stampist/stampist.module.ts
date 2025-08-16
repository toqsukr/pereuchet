import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { StampistController } from './stampist.controller';
import { StampistService } from './stampist.service';

@Module({
  imports: [],
  controllers: [StampistController],
  providers: [StampistService, PrismaService, JwtService],
})
export class StampistModule {}

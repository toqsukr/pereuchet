import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CleanupService } from './clearnup.service';

@Module({
  providers: [PrismaService, CleanupService],
})
export class CleanupModule {}

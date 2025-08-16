import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CleanupService {
  private readonly logger = new Logger(CleanupService.name);

  constructor(private prisma: PrismaService) {}

  @Cron('0 0 * * *') // каждый день в 00:00
  async handleCron() {
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 дней

    const oldProducts = await this.prisma.stampedProduct.findMany({
      where: {
        isDeleted: true,
        changes: {
          every: {
            changedAt: { lt: date },
          },
        },
      },
      select: { id: true },
    });

    const ids = oldProducts.map((r) => r.id);

    if (ids.length === 0) return;

    this.logger.warn(`Schedule removed stamped products deleting!`);

    await this.prisma.stampAudit.deleteMany({
      where: { productID: { in: ids } },
    });

    await this.prisma.stampedProduct.deleteMany({
      where: { id: { in: ids } },
    });
  }
}

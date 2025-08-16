import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CleanupModule } from './cleanup/cleanup.module';
import { HealthModule } from './health/health.module';
import { StampedProductModule } from './stamped-product/stamped-product.module';
import { StampistModule } from './stampist/stampist.module';
import { TreadModule } from './tread/tread.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TreadModule,
    StampistModule,
    StampedProductModule,
    AuthModule,
    CleanupModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

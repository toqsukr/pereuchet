import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CleanupModule } from './cleanup/cleanup.module';
import { HealthModule } from './health/health.module';
import { ProductModule } from './product/product.module';
import { RecordModule } from './record/record.module';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ProductModule,
    WorkerModule,
    RecordModule,
    AuthModule,
    CleanupModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

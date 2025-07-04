import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [ProductModule, WorkerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

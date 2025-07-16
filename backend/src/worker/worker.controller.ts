import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateWorkerDTO,
  DeleteWorkerDTO,
  UpdateWorkerDTO,
} from './worker.dto';
import { WorkerService } from './worker.service';

@Controller('/worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  async getWorkers() {
    return this.workerService.getWorkers();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  createWorker(@Body() workerDTO: CreateWorkerDTO) {
    return this.workerService.createWorker(workerDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateWorker(@Body() workerDTO: UpdateWorkerDTO) {
    return this.workerService.updateWorker(workerDTO);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteWorker(@Body() workerDTO: DeleteWorkerDTO) {
    return this.workerService.deleteWorker(workerDTO.id);
  }
}

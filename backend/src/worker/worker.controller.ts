import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Post,
  Put,
  Query,
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
  private readonly logger = new Logger(WorkerController.name);

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getWorkers() {
    this.logger.log('GET /worker - Fetching all workers');
    return this.workerService.getWorkers();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  createWorker(@Body() workerDTO: CreateWorkerDTO) {
    this.logger.debug(
      `POST /worker - Creating worker: ${JSON.stringify(workerDTO)}`,
    );
    return this.workerService.createWorker(workerDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateWorker(@Body() workerDTO: UpdateWorkerDTO) {
    this.logger.warn(`PUT /worker - Updating worker ID: ${workerDTO.id}`);
    return this.workerService.updateWorker(workerDTO);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteWorker(@Query() query: DeleteWorkerDTO) {
    this.logger.verbose(`DELETE /worker - Deleting worker ID: ${query.id}`);
    return this.workerService.deleteWorker(query.id);
  }
}

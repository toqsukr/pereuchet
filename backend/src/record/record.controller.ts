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
  CreateRecordDTO,
  DeleteRecordDTO,
  UpdateRecordDTO,
} from './record.dto';
import { RecordService } from './record.service';

@Controller('/record')
export class RecordController {
  private readonly logger = new Logger(RecordController.name);

  constructor(private readonly recordService: RecordService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  getRecords() {
    this.logger.log('GET /record - Accessing records');
    return this.recordService.getRecords();
  }

  @Post()
  @HttpCode(201)
  createRecord(@Body() recordDTO: CreateRecordDTO) {
    this.logger.debug(`POST /record - Attempting to create record (sanitized)`);
    return this.recordService.createRecord(recordDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateRecord(@Body() recordDTO: UpdateRecordDTO) {
    this.logger.warn(`PUT /record - Updating record ID: ${recordDTO.id}`);
    return this.recordService.updateRecord(recordDTO);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteRecord(@Query() query: DeleteRecordDTO) {
    this.logger.warn(`DELETE /record - Deleting record ID: ${query.id}`);
    return this.recordService.deleteRecord(query.id);
  }
}

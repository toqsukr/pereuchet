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
  CreateRecordDTO,
  DeleteRecordDTO,
  UpdateRecordDTO,
} from './record.dto';
import { RecordService } from './record.service';

@Controller('/record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  getRecords() {
    return this.recordService.getRecords();
  }

  @Post()
  @HttpCode(201)
  createRecord(@Body() recordDTO: CreateRecordDTO) {
    return this.recordService.createRecord(recordDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateRecord(@Body() recordDTO: UpdateRecordDTO) {
    return this.recordService.updateRecord(recordDTO);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteRecord(@Body() recordDTO: DeleteRecordDTO) {
    return this.recordService.deleteRecord(recordDTO.id);
  }
}

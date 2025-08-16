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
import { CreateTreadDTO, DeleteTreadDTO, UpdateTreadDTO } from './tread.dto';
import { TreadService } from './tread.service';

@Controller('/tread')
export class TreadController {
  private readonly logger = new Logger(TreadController.name);

  constructor(private readonly treadService: TreadService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getTreads() {
    this.logger.log('GET /tread - Fetching tread catalog');
    return this.treadService.getTreads();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  createTread(@Body() treadDTO: CreateTreadDTO) {
    this.logger.debug(
      `POST /tread - Creating tread with code: ${treadDTO.code}`,
    );
    return this.treadService.createTread(treadDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateTread(@Body() treadDTO: UpdateTreadDTO) {
    this.logger.warn(`PUT /tread - Updating tread code: ${treadDTO.code}`);
    return this.treadService.updateTread(treadDTO);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteTread(@Query() query: DeleteTreadDTO) {
    this.logger.warn(`DELETE /tread - Deleting tread code: ${query.code}`);
    return this.treadService.deleteTread(query.code);
  }
}

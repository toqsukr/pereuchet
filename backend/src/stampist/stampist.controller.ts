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
  CreateStampistDTO,
  DeleteStampistDTO,
  UpdateStampistDTO,
} from './stampist.dto';
import { StampistService } from './stampist.service';

@Controller('/stampist')
export class StampistController {
  constructor(private readonly stampistService: StampistService) {}
  private readonly logger = new Logger(StampistController.name);

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getStampists() {
    this.logger.log('GET /stampist - Fetching all stampists');
    return this.stampistService.getStampists();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  createStampist(@Body() stampistDTO: CreateStampistDTO) {
    this.logger.debug(
      `POST /stampist - Creating stampist: ${JSON.stringify(stampistDTO)}`,
    );
    return this.stampistService.createStampist(stampistDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateStampist(@Body() stampistDTO: UpdateStampistDTO) {
    this.logger.warn(`PUT /stampist - Updating stampist ID: ${stampistDTO.id}`);
    return this.stampistService.updateStampist(stampistDTO);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteStampist(@Query() query: DeleteStampistDTO) {
    this.logger.verbose(`DELETE /stampist - Deleting stampist ID: ${query.id}`);
    return this.stampistService.deleteStampist(query.id);
  }
}

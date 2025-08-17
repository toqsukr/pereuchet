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
  Req,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateStampistDTO,
  DeleteStampistDTO,
  MassUpdateStampistsDTO,
  UpdateStampistDTO,
} from './stampist.dto';
import { StampistService } from './stampist.service';

const STAMPIST_PREFIX = '/stampist';

@Controller(STAMPIST_PREFIX)
export class StampistController {
  constructor(private readonly stampistService: StampistService) {}
  private readonly logger = new Logger(StampistController.name);

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getStampists() {
    this.logger.log(`GET ${STAMPIST_PREFIX} - Fetching all stampists`);
    return this.stampistService.getStampists();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  createStampist(@Body() stampistDTO: CreateStampistDTO) {
    this.logger.debug(
      `POST ${STAMPIST_PREFIX} - Creating stampist: ${JSON.stringify(stampistDTO)}`,
    );
    return this.stampistService.createStampist(stampistDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateStampist(@Body() stampistDTO: UpdateStampistDTO) {
    this.logger.warn(
      `PUT ${STAMPIST_PREFIX} - Updating stampist ID: ${stampistDTO.id}`,
    );
    return this.stampistService.updateStampist(stampistDTO);
  }

  @Put('/mass-update')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  massUpdateStampedProducts(
    @Body() body: MassUpdateStampistsDTO,
    @Req() request: FastifyRequest,
  ) {
    this.logger.warn(
      `PUT ${STAMPIST_PREFIX}/mass-update - Mass stampists updating`,
    );
    return this.stampistService.massUpdateStampist(body.stampists, request);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteStampist(@Query() query: DeleteStampistDTO) {
    this.logger.verbose(
      `DELETE ${STAMPIST_PREFIX} - Deleting stampist ID: ${query.id}`,
    );
    return this.stampistService.deleteStampist(query.id);
  }
}

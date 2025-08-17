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
  CreateTreadDTO,
  DeleteTreadDTO,
  MassUpdateTreadsDTO,
  UpdateTreadDTO,
} from './tread.dto';
import { TreadService } from './tread.service';

const TREAD_PREFIX = '/tread';

@Controller(TREAD_PREFIX)
export class TreadController {
  private readonly logger = new Logger(TreadController.name);

  constructor(private readonly treadService: TreadService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getTreads() {
    this.logger.log(`GET ${TREAD_PREFIX} - Fetching tread catalog`);
    return this.treadService.getTreads();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  createTread(@Body() treadDTO: CreateTreadDTO) {
    this.logger.debug(
      `POST ${TREAD_PREFIX} - Creating tread with code: ${treadDTO.code}`,
    );
    return this.treadService.createTread(treadDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateTread(@Body() treadDTO: UpdateTreadDTO) {
    this.logger.warn(
      `PUT ${TREAD_PREFIX} - Updating tread code: ${treadDTO.code}`,
    );
    return this.treadService.updateTread(treadDTO);
  }

  @Put('/mass-update')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  massUpdateStampedProducts(
    @Body() body: MassUpdateTreadsDTO,
    @Req() request: FastifyRequest,
  ) {
    this.logger.warn(`PUT ${TREAD_PREFIX}/mass-update - Mass treads updating`);
    return this.treadService.massUpdateTread(body.treads, request);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteTread(@Query() query: DeleteTreadDTO) {
    this.logger.warn(
      `DELETE ${TREAD_PREFIX} - Deleting tread code: ${query.code}`,
    );
    return this.treadService.deleteTread(query.code);
  }
}

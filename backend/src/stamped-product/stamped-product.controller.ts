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
  CreateStampedProductDTO,
  DeleteStampedProductDTO,
  MassUpdateStampedProductsDTO,
  UpdateStampedProductDTO,
} from './stamped-product.dto';
import { StampedProductService } from './stamped-product.service';

@Controller('/stamped-product')
export class StampedProductController {
  private readonly logger = new Logger(StampedProductController.name);

  constructor(private readonly stampedProductService: StampedProductService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  getStampedProducts() {
    this.logger.log('GET /stamped-product - Accessing stamped products');
    return this.stampedProductService.getStampedProducts();
  }

  @Post()
  @HttpCode(201)
  acceptStampedProduct(
    @Body() productDTO: CreateStampedProductDTO,
    @Req() request: FastifyRequest,
  ) {
    this.logger.debug(
      `POST /stamped-product - Attempting to accept stamped product (sanitized)`,
    );
    return this.stampedProductService.acceptStampedProduct(productDTO, request);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateStampedProduct(
    @Body() productDTO: UpdateStampedProductDTO,
    @Req() request: FastifyRequest,
  ) {
    this.logger.warn(
      `PUT /stamped-product - Updating stamped product with ID: ${productDTO.id}`,
    );
    return this.stampedProductService.updateStampedProduct(productDTO, request);
  }

  @Put('/mass-update')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  massUpdateStampedProducts(
    @Body() body: MassUpdateStampedProductsDTO,
    @Req() request: FastifyRequest,
  ) {
    this.logger.warn(
      `PUT /stamped-product/mass-update - Mass stamped products updating`,
    );
    return this.stampedProductService.massUpdateStampedProducts(
      body.stampedProducts,
      request,
    );
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteStampedProduct(
    @Query() query: DeleteStampedProductDTO,
    @Req() request: FastifyRequest,
  ) {
    this.logger.warn(
      `DELETE /stamped-product - Deleting stamped product with ID: ${query.id}`,
    );
    return this.stampedProductService.deleteStampedProduct(query.id, request);
  }
}

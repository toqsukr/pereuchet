import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateProductDTO,
  DeleteProductDTO,
  UpdateProductDTO,
} from './product.dto';
import { ProductService } from './product.service';

@Controller('/product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getProducts() {
    this.logger.log('GET /product - Fetching product catalog');
    return this.productService.getProducts();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  createProduct(@Body() productDTO: CreateProductDTO) {
    this.logger.debug(
      `POST /product - Creating product with code: ${productDTO.code}`,
    );
    return this.productService.createProduct(productDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateProduct(@Body() productDTO: UpdateProductDTO) {
    this.logger.warn(
      `PUT /product - Updating product code: ${productDTO.code}`,
    );
    return this.productService.updateProduct(productDTO);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteProduct(@Body() productDTO: DeleteProductDTO) {
    this.logger.warn(
      `DELETE /product - Deleting product code: ${productDTO.code}`,
    );
    return this.productService.deleteProduct(productDTO.code);
  }
}

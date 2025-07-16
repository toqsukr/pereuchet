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
  CreateProductDTO,
  DeleteProductDTO,
  UpdateProductDTO,
} from './product.dto';
import { ProductService } from './product.service';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  createProduct(@Body() productDTO: CreateProductDTO) {
    return this.productService.createProduct(productDTO);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  updateProduct(@Body() productDTO: UpdateProductDTO) {
    return this.productService.updateProduct(productDTO);
  }

  @Delete()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  deleteProduct(@Body() productDTO: DeleteProductDTO) {
    return this.productService.deleteProduct(productDTO.code);
  }
}

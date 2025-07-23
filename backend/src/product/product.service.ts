import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getProductByCode(code: string) {
    this.logger.debug(`Looking up product by code: ${code}`);
    const foundProduct = await this.prisma.product.findUnique({
      where: { code },
    });

    if (!foundProduct) {
      this.logger.warn(`Product not found: ${code}`);
      throw new HttpException(
        `Product by code ${code} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return foundProduct;
  }

  async getProducts() {
    this.logger.log('Fetching all products');
    const products = await this.prisma.product.findMany();
    return JSON.stringify(products);
  }

  async createProduct(productData: CreateProductDTO) {
    this.logger.debug(`Creating product: ${productData.code}`);
    await this.prisma.product.create({ data: productData });
    this.logger.log(`Product created: ${productData.code}`);
    return 'Success!';
  }

  async updateProduct(productData: UpdateProductDTO) {
    this.logger.warn(`Updating product: ${productData.code}`);
    await this.prisma.product.update({
      where: { code: productData.code },
      data: productData,
    });
    this.logger.log(`Product updated: ${productData.code}`);
    return 'Success!';
  }

  async deleteProduct(code: string) {
    this.logger.warn(`Deleting product: ${code}`);
    await this.prisma.product.delete({ where: { code } });
    this.logger.log(`Product deleted: ${code}`);
    return 'Success!';
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductByCode(code: string) {
    const foundProduct = await this.prisma.product.findUnique({
      where: { code },
    });

    if (!foundProduct) {
      throw new HttpException(
        `Product by code ${code} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return foundProduct;
  }

  async getProducts() {
    const products = await this.prisma.product.findMany();
    return JSON.stringify(products);
  }

  async createProduct(productData: CreateProductDTO) {
    await this.prisma.product.create({ data: productData });
    return 'Success!';
  }

  async updateProduct(productData: UpdateProductDTO) {
    await this.prisma.product.update({
      where: { code: productData.code },
      data: productData,
    });
    return 'Success!';
  }

  async deleteProduct(code: string) {
    await this.prisma.product.delete({ where: { code } });
    return 'Success!';
  }
}

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { JwtHelper } from 'src/auth/auth.helper';
import { PrismaService } from 'src/prisma.service';
import { StampistService } from 'src/stampist/stampist.service';
import { TreadService } from 'src/tread/tread.service';
import {
  MassUpdateStampedProductsDTO,
  UpdateStampedProductDTO,
} from './stamped-product.dto';

@Injectable()
export class StampedProductService {
  private readonly logger = new Logger(StampedProductService.name);

  private readonly actions = {
    CREATED: 'CREATED',
    EDITED: 'EDITED',
    DELETED: 'DELETED',
  } as const;

  constructor(
    private readonly prisma: PrismaService,
    private readonly tread: TreadService,
    private readonly stampist: StampistService,
    private jwtService: JwtService,
  ) {}

  static getLocaltime() {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - timezoneOffset).toISOString();
  }

  defineActor(request: FastifyRequest) {
    const token = JwtHelper.extractTokenFromHeader(request);
    const actor = this.jwtService.decode<{ sub: string } | undefined>(
      token ?? '',
    )?.sub;

    if (!actor)
      throw new HttpException(
        `Что-то пошло не так. Токен не найден!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return actor;
  }

  async getStampedProducts() {
    this.logger.log('Fetching all stamped products');
    const products = await this.prisma.stampedProduct.findMany({
      where: { isDeleted: false },
      include: { changes: true },
      omit: { isDeleted: true },
      orderBy: { id: 'asc' },
    });

    return JSON.stringify(
      products.map(({ changes, ...rest }) => ({
        ...rest,
        editedAt: changes[changes.length - 1].changedAt,
        editedBy: changes[changes.length - 1].changedBy,
      })),
    );
  }

  async getStampedProductByID(id: number) {
    this.logger.debug(`Looking up product ID: ${id}`);
    const foundProduct = await this.prisma.stampedProduct.findUnique({
      where: { id },
    });
    if (!foundProduct) {
      this.logger.warn(`Stamped product not found: ID ${id}`);
      throw new HttpException(
        `Запись с номером ${id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundProduct;
  }

  async acceptStampedProduct(
    productData: {
      stampistID: number;
      treadCode: string;
      amount: number;
    },
    request: FastifyRequest,
  ) {
    const creator = this.defineActor(request);

    this.logger.debug(
      `Creating product for stampist ${productData.stampistID} and tread ${productData.treadCode} by ${creator}`,
    );

    await this.tread.getTreadByCode(productData.treadCode);
    await this.stampist.getStampistByID(productData.stampistID);

    const localISOTime = StampedProductService.getLocaltime();

    this.logger.verbose(`Using local time: ${localISOTime}`);

    const savedProduct = await this.prisma.stampedProduct.create({
      data: {
        ...productData,
        createdBy: creator,
        createdAt: localISOTime,
      },
      omit: { isDeleted: true },
    });

    const productAudit = await this.prisma.stampAudit.create({
      data: {
        ...productData,
        productID: savedProduct.id,
        action: this.actions.CREATED,
        changedBy: creator,
        changedAt: localISOTime,
      },
    });

    this.logger.log(
      `Stamped product accepted successfully: ID ${savedProduct.id}`,
    );
    return JSON.stringify({
      ...savedProduct,
      editedAt: productAudit.changedAt,
      editedBy: productAudit.changedBy,
    });
  }

  async updateStampedProduct(
    productData: UpdateStampedProductDTO,
    request: FastifyRequest,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    const editor = this.defineActor(request);
    this.logger.warn(
      `Обновление записи ID: ${productData.id} пользователем ${editor}`,
    );

    if (productData.treadCode) {
      this.logger.debug(`Проверка кода продукта: ${productData.treadCode}`);
      await this.tread.getTreadByCode(productData.treadCode);
    }
    if (productData.stampistID) {
      this.logger.debug(`Проверка ID работника: ${productData.stampistID}`);
      await this.stampist.getStampistByID(productData.stampistID);
    }

    const foundProduct = await this.getStampedProductByID(productData.id);
    if (!foundProduct) {
      this.logger.error(
        `Обновление не удалось: запись ID ${productData.id} не найдена`,
      );
      throw new HttpException(
        `Запись с ID ${productData.id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const { id, ...rest } = productData;

    const updatedProduct = await client.stampedProduct.update({
      where: { id },
      data: rest,
    });
    this.logger.log(`Запись успешно обновлена: ID ${id}`);

    const { changedAt, changedBy } = await client.stampAudit.create({
      data: {
        ...rest,
        productID: updatedProduct.id,
        action: this.actions.EDITED,
        changedBy: editor,
        changedAt: StampedProductService.getLocaltime(),
      },
    });

    return { ...updatedProduct, editedBy: changedBy, editedAt: changedAt };
  }

  async deleteStampedProduct(
    id: number,
    request: FastifyRequest,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    const remover = this.defineActor(request);
    this.logger.warn(`${remover} пытается удалить запись с ID: ${id}`);

    const foundProduct = await client.stampedProduct.findUnique({
      where: { id },
    });
    if (!foundProduct) {
      this.logger.error(`Удаление не удалось: запись ID ${id} не найдена`);
      throw new HttpException(
        `Запись с ID ${id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const product = await client.stampedProduct.update({
      where: { id },
      select: { amount: true, treadCode: true, stampistID: true },
      data: { isDeleted: true },
    });

    await client.stampAudit.create({
      data: {
        ...product,
        productID: id,
        changedBy: remover,
        changedAt: StampedProductService.getLocaltime(),
        action: this.actions.DELETED,
      },
    });

    this.logger.log(`Запись успешно удалена: ID ${id}`);
    return 'Success!';
  }

  async massUpdateStampedProducts(
    products: MassUpdateStampedProductsDTO['stampedProducts'],
    request: FastifyRequest,
  ) {
    return this.prisma.$transaction(async (tx) => {
      for await (const { isDeleted, ...product } of products) {
        if (isDeleted) {
          await this.deleteStampedProduct(product.id, request, tx);
        } else {
          await this.updateStampedProduct(product, request, tx);
        }
      }
      this.logger.log(
        `Массовое обновление завершено пользователем ${this.defineActor(request)}`,
      );
      return 'Success!';
    });
  }
}

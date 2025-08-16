import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateStampedProductDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  treadCode: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stampistID: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  amount: number;
}

export class DeleteStampedProductDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}

export class UpdateStampedProductDTO extends DeleteStampedProductDTO {
  @IsNotEmpty()
  @IsString()
  treadCode: string;

  @IsNotEmpty()
  @IsNumber()
  stampistID: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class TStampedProduct extends CreateStampedProductDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}

export class MassUpdateStampedProduct extends TStampedProduct {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isDeleted: boolean;
}

export class MassUpdateStampedProductsDTO {
  @IsArray()
  @ValidateNested({ each: true }) // Валидируем каждый элемент массива
  @Type(() => MassUpdateStampedProduct) // Указываем тип элементов
  @ApiProperty({ type: [MassUpdateStampedProduct] }) // Уточняем для Swagger
  stampedProducts: MassUpdateStampedProduct[];
}

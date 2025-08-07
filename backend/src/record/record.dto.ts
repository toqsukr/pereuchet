import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateRecordDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productCode: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  workerID: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  amount: number;
}

export class DeleteRecordDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}

export class UpdateRecordDTO extends DeleteRecordDTO {
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  productCode: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  workerID: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiPropertyOptional()
  amount: number;
}

export class MassUpdateRecord extends CreateRecordDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}

export class MassUpdateRecordsDTO {
  @IsArray()
  @ValidateNested({ each: true }) // Валидируем каждый элемент массива
  @Type(() => MassUpdateRecord) // Указываем тип элементов
  @ApiProperty({ type: [MassUpdateRecord] }) // Уточняем для Swagger
  records: MassUpdateRecord[];
}

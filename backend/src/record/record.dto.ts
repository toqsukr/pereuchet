import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  productCode?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  workerID?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiPropertyOptional()
  amount?: number;
}

export class RecordDTO extends CreateRecordDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  date: Date;
}

export class MassUpdateRecordsDTO {
  @IsArray()
  @ValidateNested({ each: true }) // Валидируем каждый элемент массива
  @Type(() => RecordDTO) // Указываем тип элементов
  @ApiProperty({ type: [RecordDTO] }) // Уточняем для Swagger
  records: RecordDTO[];
}

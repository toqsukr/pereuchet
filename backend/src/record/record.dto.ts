import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
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

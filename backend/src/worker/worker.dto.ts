import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWorkerDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class DeleteWorkerDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}

export class UpdateWorkerDTO extends CreateWorkerDTO {}

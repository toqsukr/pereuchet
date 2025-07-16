import { ApiProperty } from '@nestjs/swagger';
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
  id: number;
}

export class UpdateWorkerDTO extends CreateWorkerDTO {}

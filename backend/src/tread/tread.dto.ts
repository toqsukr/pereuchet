import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTreadDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class DeleteTreadDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}

export class UpdateTreadDTO extends CreateTreadDTO {}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

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

export class MassUpdateTread extends UpdateTreadDTO {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isDeleted: boolean;
}

export class MassUpdateTreadsDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MassUpdateTread)
  @ApiProperty({ type: [MassUpdateTread] })
  treads: MassUpdateTread[];
}

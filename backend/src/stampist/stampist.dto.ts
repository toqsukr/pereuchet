import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateStampistDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class DeleteStampistDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}

export class UpdateStampistDTO extends CreateStampistDTO {}

export class MassUpdateStampist extends UpdateStampistDTO {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isDeleted: boolean;
}

export class MassUpdateStampistsDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MassUpdateStampist)
  @ApiProperty({ type: [MassUpdateStampist] })
  stampists: MassUpdateStampist[];
}

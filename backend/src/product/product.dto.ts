import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class DeleteProductDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}

export class UpdateProductDTO extends CreateProductDTO {}

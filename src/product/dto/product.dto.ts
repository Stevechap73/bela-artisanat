import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ProductDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(900000)
  price: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}

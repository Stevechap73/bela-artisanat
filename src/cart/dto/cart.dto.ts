import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CartDto {
  @IsOptional()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}

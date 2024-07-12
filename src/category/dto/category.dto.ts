import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsOptional()
  id: number;

  @IsString()
  name: string;
}

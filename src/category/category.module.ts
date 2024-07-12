import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [CategoryModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

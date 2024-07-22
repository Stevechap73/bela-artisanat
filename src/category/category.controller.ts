import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  GetAllCategories() {
    return this.categoryService.getAllCategories();
  }

  // @UseGuards(JwtGuard)
  @Post('/add')
  addCategory(@Body() dto: CategoryDto) {
    return this.categoryService.addCategory(dto);
  }

  // @UseGuards(JwtGuard)
  @Patch('/update/:id')
  editCategory(@Body() dto: CategoryDto, @Param('id') id: number) {
    return this.categoryService.editCategory(id, dto);
  }

  // @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}

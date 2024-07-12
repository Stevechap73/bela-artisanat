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
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { Category, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtGuard)
  @Get('/all')
  getAllProducts() {
    return this.productService.getAllProducts();
  }
  // @UseGuards(JwtGuard)
  @Post('/add')
  addProduct(@Body() dto: ProductDto, @GetUser() user: User) {
    return this.productService.addProduct(dto, user);
  }
  // @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateProduct(@Body() dto: ProductDto, @Param('id') id: number) {
    return this.productService.updateProduct(id, dto);
  }

  // @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}

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

@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //  @UseGuards(JwtGuard)
  @Get('/all')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('category/:categoryId')
  getProductsByCategory(@Param('categoryId') categoryId: number) {
    return this.productService.getProductsByCategory(categoryId);
  }

  @Get('one/:id')
  getOneProduct(@Param('id') id: number) {
    return this.productService.getOneProduct(id);
  }

  @Get('/search/:category')
  searchProduct(@Param('category') productCategory: string) {
    return this.productService.searchProduct(productCategory);
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

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/all')
  getAllCarts() {
    return this.cartService.getAllCarts();
  }
  // @UseGuards(JwtGuard)
  @Post('/add')
  addCart(@Body() dto: CartDto, @GetUser() user: User) {
    return this.cartService.addCart(dto, user);
  }
}

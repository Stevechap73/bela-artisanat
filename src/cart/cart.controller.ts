import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/all')
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @Post('/add')
  addCart(@Body() dto: CartDto, @GetUser() user: User) {
    return this.cartService.addCart(dto, user);
  }
}

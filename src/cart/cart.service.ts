import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // All
  async getAllCarts() {
    return this.prisma.cart.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Add
  async addCart(dto: CartDto, user: User) {
    return this.prisma.cart.create({
      data: {
        userId: user.id,
        total: dto.total,
        status: dto.status,
      },
    });
  }
}

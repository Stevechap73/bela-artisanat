import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
import { Category, User } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        category: {
          select: {
            name: true,
          },
        },
        id: true,
        image: true,
        title: true,
        description: true,
        price: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async addProduct(dto: ProductDto, user: User) {
    return this.prisma.product.create({
      data: {
        categoryId: dto.categoryId,
        title: dto.title,
        description: dto.description,
        image: dto.image,
        price: dto.price,
        status: dto.status,
      },
    });
  }

  async updateProduct(id: number, dto: ProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existingProduct || !existingProduct) {
      throw new ForbiddenException('Unexisting id');
    }
    return this.prisma.product.update({
      where: {
        id: Number(id),
      },
      data: { ...dto },
    });
  }

  async deleteProduct(id: number) {
    if (!id) {
      throw new BadRequestException('id is missing');
    } else {
      const existingProduct = await this.prisma.product.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
        },
      });
      if (!existingProduct || !existingProduct.id) {
        throw new ForbiddenException("Product doesn't exist");
      }

      return this.prisma.product.delete({
        where: {
          id: Number(id),
        },
      });
    }
  }
}

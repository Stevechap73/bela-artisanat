import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // All
  async getAllCategories() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  // Add
  async addCategory(dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
      },
    });
  }

  // Update
  async editCategory(id: number, dto: CategoryDto) {
    if (!id || !dto.name) {
      throw new BadRequestException('Missing fields');
    }
    const existingCategoryName = await this.prisma.category.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (existingCategoryName) {
      throw new ForbiddenException('Name already taken');
    } else {
      return this.prisma.category.update({
        where: {
          id: Number(id),
        },
        data: {
          name: dto.name,
        },
      });
    }
  }

  // Delete
  async deleteCategory(id: number) {
    if (!id) {
      throw new BadRequestException('id is missing');
    } else {
      const existingCategory = await this.prisma.category.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
        },
      });
      if (!existingCategory || !existingCategory.id) {
        throw new ForbiddenException("Category doesn't exist");
      }

      return this.prisma.category.delete({
        where: {
          id: Number(id),
        },
      });
    }
  }
}

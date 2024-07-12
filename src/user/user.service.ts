import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        pseudo: true,
        email: true,
        address: true,
        phone: true,
      },
    });
  }

  async updateUser(id: number, dto: UserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException("User doesn't exist");
    }

    return this.prisma.user.update({
      where: { id: Number(id) },
      data: { ...dto },
      select: {
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        pseudo: true,
        address: true,
        phone: true,
        roleId: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(id: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException("User doesn't exist");
    }

    return this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}

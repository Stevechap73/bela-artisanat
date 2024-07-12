import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  // All
  async getAllRoles() {
    return this.prisma.role.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  // Add
  async addRole(dto: RoleDto) {
    return this.prisma.role.create({
      data: {
        name: dto.name,
      },
    });
  }

  // Update
  async editRole(id: number, dto: RoleDto) {
    if (!id || !dto.name) {
      throw new BadRequestException('Missing fields');
    }
    const existingRoleName = await this.prisma.role.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (existingRoleName) {
      throw new ForbiddenException('Name already taken');
    } else {
      return this.prisma.role.update({
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
  async deleteRole(id: number) {
    if (!id) {
      throw new BadRequestException('id is missing');
    } else {
      const existingRole = await this.prisma.role.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
        },
      });
      if (!existingRole || !existingRole.id) {
        throw new ForbiddenException("Role doesn't exist");
      }

      return this.prisma.role.delete({
        where: {
          id: Number(id),
        },
      });
    }
  }
}

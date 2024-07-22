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
import { RoleService } from './role.service';
import { RoleDto } from './dto';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/all')
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
  // @UseGuards(JwtGuard)
  @Post('/add')
  addRole(@Body() dto: RoleDto) {
    return this.roleService.addRole(dto);
  }
  // @UseGuards(JwtGuard)
  @Patch('/update/:id')
  editRole(@Body() dto: RoleDto, @Param('id') id: number) {
    return this.roleService.editRole(id, dto);
  }

  // @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}

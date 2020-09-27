import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { User, UserRole } from './user.entity';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Post()
  async create(@Body(ValidationPipe) data: any): Promise<User> {
    return this.service.upsert(data);
  }

  @Patch()
  async update(@Body(ValidationPipe) data: UpdateUserDto): Promise<User> {
    return this.service.updateExisting(data);
  }

  @Delete()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Body(ValidationPipe) data: UpdateUserDto): Promise<void> {
    return this.service.detele(data);
  }
}

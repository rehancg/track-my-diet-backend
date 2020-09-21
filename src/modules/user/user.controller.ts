
import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { CreateUserDto } from "./dto/create_user.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";
@Controller('user')
export class UserController {
    constructor(private service: UserService) { }

    @Get()
    async getAll(): Promise<User[]> {
        return this.service.getAll();
    }

    @Post()
    async create(@Body(ValidationPipe) data: CreateUserDto): Promise<User> {
        return this.service.upsert(data);
    }

    @Patch()
    async update(@Body(ValidationPipe) data: UpdateUserDto): Promise<User> {
        return this.service.updateExisting(data);
    }

    @Delete()
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}
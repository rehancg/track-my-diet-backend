
import { Body, Controller, Delete, Get, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserRole } from "../user/user.entity";
import { FoodType } from "./food_type.entity";
import { FoodTypeService } from "./food_type.service";

@Controller('meta/food_type')
export class FoodTypeContoller {
    constructor(private service: FoodTypeService) {

    }

    @Get()
    async getAll(): Promise<FoodType[]> {
        return this.service.getAll();
    }

    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body(ValidationPipe) data: CreateMetaDto): Promise<FoodType> {
        return this.service.createNew(data);
    }

    @Patch()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Body(ValidationPipe) data: PatchMetaDto): Promise<FoodType> {
        return this.service.updateExisting(data);
    }

    @Delete()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}
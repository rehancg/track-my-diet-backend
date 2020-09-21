
import { Body, Controller, Delete, Get, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserRole } from "../user/user.entity";
import { Goal } from "./goal.entity";
import { GoalService } from "./goal.sevice";

@Controller('meta/goal')
export class GoalContoller {
    constructor(private service: GoalService) {

    }

    @Get()
    async getAll(): Promise<Goal[]> {
        return this.service.getAll();
    }

    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body(ValidationPipe) data: CreateMetaDto): Promise<Goal> {
        return this.service.createNew(data);
    }

    @Patch()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Body(ValidationPipe) data: PatchMetaDto): Promise<Goal> {
        return this.service.updateExisting(data);
    }

    @Delete()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}

import { Body, Controller, Delete, Get, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserRole } from "../user/user.entity";
import { EatingWindow } from "./eating_window.entity";
import { EatingWindowService } from "./eating_window.sevice";

@Controller('meta/eating_window')
export class EatingWindowContoller {
    constructor(private service: EatingWindowService) {

    }

    @Get()
    async getAll(): Promise<EatingWindow[]> {
        return this.service.getAll();
    }

    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body(ValidationPipe) data: CreateMetaDto): Promise<EatingWindow> {
        return this.service.createNew(data);
    }

    @Patch()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Body(ValidationPipe) data: PatchMetaDto): Promise<EatingWindow> {
        return this.service.updateExisting(data);
    }

    @Delete()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}
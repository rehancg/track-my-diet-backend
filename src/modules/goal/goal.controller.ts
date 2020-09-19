
import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
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
    async create(@Body(ValidationPipe) data: CreateMetaDto): Promise<Goal> {
        return this.service.createNew(data);
    }

    @Patch()
    async update(@Body(ValidationPipe) data: PatchMetaDto): Promise<Goal> {
        return this.service.updateExisting(data);
    }

    @Delete()
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}
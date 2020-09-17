import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { ActivityLevel } from "./activity_level.entity";
import { ActivityLevelService } from "./activity_level.service";

@Controller('meta/activity_levels')
export class ActivityLevelContoller {
    constructor(private activityLevelService: ActivityLevelService) {

    }

    @Get()
    async getAll(): Promise<ActivityLevel[]> {
        return this.activityLevelService.getAll();
    }

    @Post()
    async create(@Body(ValidationPipe) data: CreateMetaDto): Promise<ActivityLevel> {
        return this.activityLevelService.createNew(data);
    }

    @Patch()
    async update(@Body(ValidationPipe) data: PatchMetaDto): Promise<ActivityLevel> {
        return this.activityLevelService.updateExisting(data);
    }

    @Delete()
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.activityLevelService.detele(data);
    }

}

import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { NutritionType } from "./nutrition_type.entity";
import { NutritionTypeService } from "./nutrition_type.service";

@Controller('meta/nutrition_type')
export class NutritionTypeController {
    constructor(private service: NutritionTypeService) { }

    @Get()
    async getAll(): Promise<NutritionType[]> {
        return this.service.getAll();
    }

    @Post()
    async create(@Body(ValidationPipe) data: CreateMetaDto): Promise<NutritionType> {
        return this.service.createNew(data);
    }

    @Patch()
    async update(@Body(ValidationPipe) data: PatchMetaDto): Promise<NutritionType> {
        return this.service.updateExisting(data);
    }

    @Delete()
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}
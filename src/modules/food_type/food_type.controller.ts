
import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
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
    async create(@Body(ValidationPipe) data: CreateMetaDto): Promise<FoodType> {
        return this.service.createNew(data);
    }

    @Patch()
    async update(@Body(ValidationPipe) data: PatchMetaDto): Promise<FoodType> {
        return this.service.updateExisting(data);
    }

    @Delete()
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}
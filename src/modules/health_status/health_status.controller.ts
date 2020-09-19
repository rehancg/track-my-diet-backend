
import { Body, Controller, Delete, Get, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateMetaDto } from "src/shared/dto/create-meta-dto";
import { PatchMetaDto } from "src/shared/dto/patch-meta-dto";
import { HealthStatus } from "./health_status.entity";
import { HealthStatusService } from "./health_status.service";

@Controller('meta/health_status')
export class HealthStatusContoller {
    constructor(private service: HealthStatusService) {

    }

    @Get()
    async getAll(): Promise<HealthStatus[]> {
        return this.service.getAll();
    }

    @Post()
    async create(@Body(ValidationPipe) data: CreateMetaDto): Promise<HealthStatus> {
        return this.service.createNew(data);
    }

    @Patch()
    async update(@Body(ValidationPipe) data: PatchMetaDto): Promise<HealthStatus> {
        return this.service.updateExisting(data);
    }

    @Delete()
    async delete(@Body(ValidationPipe) data: PatchMetaDto): Promise<void> {
        return this.service.detele(data);
    }

}
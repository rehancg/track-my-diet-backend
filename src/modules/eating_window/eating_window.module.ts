import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EatingWindowRepository } from './eating.window.repository';
import { EatingWindowContoller } from './eating_window.controller';
import { EatingWindowService } from './eating_window.sevice';

@Module({
    imports: [
        TypeOrmModule.forFeature([EatingWindowRepository]),
    ],
    controllers: [EatingWindowContoller],
    providers: [EatingWindowService]
})
export class EatingWindowModule { }

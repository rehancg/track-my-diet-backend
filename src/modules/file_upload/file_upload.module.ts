
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';

@Module({
    imports: [AuthModule],
    controllers: [FileUploadController],
    providers: [FileUploadService],
    exports: [FileUploadService],
})
export class FileUploadModule { }
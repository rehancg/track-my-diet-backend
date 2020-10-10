import { Req, Res, Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as config from 'config';
import { Logger } from 'src/shared/logger';

const awsConfig = config.get('aws');
const s3 = new AWS.S3({
    endpoint: awsConfig.endPoint
})

@Injectable()
export class FileUploadService {
    private readonly logger: Logger = Logger.getInstance();

    constructor() { }

    async fileupload(@Req() req, @Res() res) {
        try {
            this.upload(req, res, function (error) {
                if (error) {
                    return res.status(404).json(`Failed to upload image file: ${error}`);
                }
                return res.status(201).json(req.files[0].location);
            });
        } catch (error) {
            this.logger.error(error);
            return res.status(500).json(`Failed to upload image file: ${error}`);
        }
    }

    upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: awsConfig.bucketName,
            acl: 'public-read',
            key: function (request, file, cb) {
                cb(null, `${Date.now().toString()} - ${file.originalname}`);
            },
        }),
    }).array('upload', 1);
}
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import * as AWS from 'aws-sdk';

AWS.config.loadFromPath(process.cwd() + '/aws_config.json')

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

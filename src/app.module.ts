import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import {AuthModule} from './modules/auth/auth.module';
import {AuthMiddleware} from './shared/util/auth.middleware';

@Module({
  imports: [
    UserModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth', method: RequestMethod.GET },
      )
      .forRoutes(
        UserModule,
      );
  }
}

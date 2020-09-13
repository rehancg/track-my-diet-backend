import {
    NestMiddleware,
    Injectable,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';

@Injectable()
  export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: () => void) {
      const token =
        !!req.headers &&
        // tslint:disable:no-string-literal
        !!req.headers['authorization'] &&
        req.headers['authorization'];
      if (token) {
        const cognitoResults = true ;
        if (cognitoResults) {
          next();
        } else {
          throw new HttpException(
            'Not Authorized to access the API',
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          'Not Authorized to access the API',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }

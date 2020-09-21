import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';
import { JwtPayload } from "./jwt-payload.interface";
import { UserService } from "../user/user.service";
import { SubscriptionStatus } from "../user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        try {
            const { msisdn } = payload;
            const user = await this.userService.getUserByMsidn(msisdn);

            if (!user) {
                throw new UnauthorizedException();
            }
            else if (user.subscriptionStatus !== SubscriptionStatus.REGISTERED) {
                throw new UnauthorizedException();
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
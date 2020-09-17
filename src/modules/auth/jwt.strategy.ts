import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "../user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        // @TODO
        const { msisdn } = payload;
        const user = await this.userRepository.findOne({ msisdn });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "./dto/jwtPayload.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UnauthorizedException } from "@nestjs/common";
import * as config from 'config';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        console.log('USERNAME', payload);
        
        const user = this.userRepository.findOne({ username });

        if(!user) throw new UnauthorizedException();

        return user;
    }
}
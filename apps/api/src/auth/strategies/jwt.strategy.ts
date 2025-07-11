import { jwtConstants } from './../jwt-constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthUser } from '../types/auth-user.type';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  private static extractJWTFromCookie = (req: Request): string | null => {
    if ('jwt' in req.cookies && typeof req.cookies.jwt === 'string') {
      return req.cookies.jwt;
    }

    return null;
  };

  validate(payload: { sub: string }): AuthUser {
    return { id: payload.sub };
  }
}

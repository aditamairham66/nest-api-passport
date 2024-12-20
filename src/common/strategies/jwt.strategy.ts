import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'auth_jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Sesuaikan dengan secret Anda
    });
  }

  async validate(payload: User) {
    // Payload adalah data dalam token yang telah diverifikasi
    return {
      userId: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
}

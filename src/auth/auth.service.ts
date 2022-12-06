import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '../users/entities/user.entity';

export interface TokenPayload {
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User, res: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  logout(res: Response) {
    res.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}

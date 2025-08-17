import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { JWT_COOKIE_NAME } from './auth.constant';

export class JwtHelper {
  static extractTokenFromHeader(request: {
    cookies: { [cookieName: string]: string | undefined };
  }) {
    return request.cookies?.[JWT_COOKIE_NAME];
  }

  static verifyToken(
    token: string | undefined,
    verifyFn: <T extends object>(
      token: string,
      options: { secret?: string },
    ) => Promise<T>,
  ) {
    if (!token) {
      throw new UnauthorizedException('Token not found!');
    }
    try {
      return verifyFn(token, { secret: process.env.SECRET_JWT });
    } catch {
      throw new UnauthorizedException('Invalid token!');
    }
  }

  defineActor(request: FastifyRequest) {
    const token = JwtHelper.extractTokenFromHeader(request);
    const actor = new JwtService().decode<{ sub: string } | undefined>(
      token ?? '',
    )?.sub;

    if (!actor)
      throw new HttpException(
        `Что-то пошло не так. Токен не найден!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return actor;
  }
}

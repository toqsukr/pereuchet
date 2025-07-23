import { UnauthorizedException } from '@nestjs/common';
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
}

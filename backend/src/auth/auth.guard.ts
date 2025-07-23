import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtHelper } from './auth.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = JwtHelper.extractTokenFromHeader(request);
    const verifyFn = function () {
      return this.jwtService.verifyAsync;
    };
    const payload = await JwtHelper.verifyToken(token, verifyFn.bind(this));
    request['user'] = payload;
    return true;
  }
}

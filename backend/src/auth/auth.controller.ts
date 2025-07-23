import { Body, Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { FastifyRequest, type FastifyReply } from 'fastify';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDTO, @Res() response: FastifyReply) {
    this.logger.debug(`Login attempt for user: ${body.login}`);
    return this.authService.login(body, response);
  }

  @Post('/register')
  async register(@Body() body: RegisterDTO, @Res() response: FastifyReply) {
    this.logger.log(`Registering new user: ${body.login}`);
    return this.authService.register(body, response);
  }

  @Post('/logout')
  async logout(@Res() response: FastifyReply) {
    this.logger.verbose('Logout request');
    return this.authService.logout(response);
  }

  @Get('/check')
  async check(@Req() request: FastifyRequest) {
    this.logger.verbose('Auth check request');
    return this.authService.check(request);
  }
}

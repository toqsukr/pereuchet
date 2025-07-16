import { Body, Controller, Post, Res } from '@nestjs/common';
import { type FastifyReply } from 'fastify';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDTO, @Res() response: FastifyReply) {
    return this.authService.login(body, response);
  }

  @Post('/register')
  async register(@Body() body: RegisterDTO, @Res() response: FastifyReply) {
    return this.authService.register(body, response);
  }
}

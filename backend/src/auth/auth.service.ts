import { CookieSerializeOptions } from '@fastify/cookie';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';
import { PrismaService } from 'src/prisma.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

const cookieConfig: CookieSerializeOptions = {
  httpOnly: true,
  path: '/',
} as const;

@Injectable()
export class AuthService {
  private readonly saltOrRounds = 10;

  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  generateToken(adminID: string) {
    const payload = { sub: adminID };
    const options = {
      expiresIn: '8h',
      secret: process.env.SECRET_JWT,
    };
    return this.jwt.sign(payload, options);
  }

  async login(loginData: LoginDTO, response: FastifyReply) {
    const { login, password } = loginData;
    const admin = await this.prisma.admin.findUnique({
      where: { login },
    });
    const isMatch = await bcrypt.compare(password, admin?.hash ?? '');
    if (!isMatch) {
      throw new HttpException(`Non authorized!`, HttpStatus.CONFLICT);
    }

    const generatedToken = this.generateToken(login);

    return response
      .setCookie('jwt-token', generatedToken, cookieConfig)
      .status(HttpStatus.OK)
      .send({
        statusCode: HttpStatus.OK,
        message: 'Login successful',
      });
  }

  async register(registerData: RegisterDTO, response: FastifyReply) {
    const { login, password } = registerData;
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    const generatedToken = this.generateToken(login);

    try {
      await this.prisma.admin.create({ data: { login, hash } });
    } catch (e) {
      throw new HttpException(
        `Admin creation error: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return response
      .setCookie('jwt-token', generatedToken, cookieConfig)
      .status(HttpStatus.OK)
      .send({
        statusCode: HttpStatus.OK,
        message: 'Registration successful',
      });
  }
}

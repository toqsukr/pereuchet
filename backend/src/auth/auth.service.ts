import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';
import { PrismaService } from 'src/prisma.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

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
      expiresIn: '10m',
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
      return new HttpException(`Non authorized!`, HttpStatus.UNAUTHORIZED);
    }

    const generatedToken = this.generateToken(login);

    return response
      .setCookie('jwt-token', generatedToken, {
        httpOnly: true,
      })
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
      .setCookie('jwt-token', generatedToken, {
        httpOnly: true,
      })
      .status(HttpStatus.OK)
      .send({
        statusCode: HttpStatus.OK,
        message: 'Registration successful',
      });
  }
}

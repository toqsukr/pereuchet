import { CookieSerializeOptions } from '@fastify/cookie';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaService } from 'src/prisma.service';
import { JWT_COOKIE_NAME } from './auth.constant';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { JwtHelper } from './auth.helper';

const cookieConfig: CookieSerializeOptions = {
  httpOnly: true,
  path: '/',
} as const;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly saltOrRounds = 10;

  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  generateToken(adminID: string) {
    this.logger.debug(`Generating token for admin: ${adminID}`);
    const payload = { sub: adminID };
    const options = {
      expiresIn: '8h',
      secret: process.env.SECRET_JWT,
    };
    return this.jwt.sign(payload, options);
  }

  async login(loginData: LoginDTO, response: FastifyReply) {
    this.logger.verbose(`Login attempt for: ${loginData.login}`);
    const { login, password } = loginData;
    const admin = await this.prisma.admin.findUnique({
      where: { login },
    });

    const isMatch = await bcrypt.compare(password, admin?.hash ?? '');
    if (!isMatch) {
      this.logger.warn(`Failed login attempt for: ${loginData.login}`);
      throw new HttpException(`Non authorized!`, HttpStatus.CONFLICT);
    }

    const generatedToken = this.generateToken(login);
    this.logger.log(`Successful login for: ${login}`);

    return response
      .setCookie(JWT_COOKIE_NAME, generatedToken, cookieConfig)
      .status(HttpStatus.OK)
      .send({
        statusCode: HttpStatus.OK,
        message: 'Login successful',
      });
  }

  async register(registerData: RegisterDTO, response: FastifyReply) {
    this.logger.debug(`Registration attempt for: ${registerData.login}`);
    const { login, password } = registerData;
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    const generatedToken = this.generateToken(login);

    try {
      await this.prisma.admin.create({ data: { login, hash } });
      this.logger.log(`New admin registered: ${login}`);
    } catch (e) {
      this.logger.error(`Registration failed for ${login}: ${e.message}`);
      throw new HttpException(
        `Admin creation error: ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return response
      .setCookie(JWT_COOKIE_NAME, generatedToken, cookieConfig)
      .status(HttpStatus.OK)
      .send({
        statusCode: HttpStatus.OK,
        message: 'Registration successful',
      });
  }

  async check(request: FastifyRequest) {
    this.logger.verbose('Auth check request');
    const token = JwtHelper.extractTokenFromHeader(request);
    try {
      const verifyFn = function () {
        return this.jwt.verifyAsync;
      };
      JwtHelper.verifyToken(token, verifyFn.bind(this));
      this.logger.debug('Token validation successful');
      return { isAuthorized: true };
    } catch {
      this.logger.warn('Invalid token detected');
      return { isAuthorized: false };
    }
  }

  async logout(response: FastifyReply) {
    this.logger.log('Attempting to log out user');

    try {
      response.clearCookie(JWT_COOKIE_NAME);
      this.logger.debug('JWT cookie cleared successfully');

      return response.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: 'Logout successful',
      });
    } catch (error) {
      this.logger.error(`Logout failed: ${error.message}`, error.stack);
      throw new HttpException(
        'Logout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      this.logger.verbose('Logout process completed');
    }
  }
}

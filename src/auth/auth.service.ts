import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from './../common/validation.service';
import { PrismaService } from './../common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LoginRequest, UserResponse } from './../model/auth.model';
import { AuthValidation } from './auth.validation';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async login(request: LoginRequest): Promise<UserResponse> {
    this.logger.debug(`Login Request : (${JSON.stringify(request)})`);

    const loginRequest: LoginRequest = this.validationService.validate(
      AuthValidation.LOGIN,
      request,
    );

    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginRequest.username,
      },
    });

    if (!user) {
      throw new HttpException('Username is not found.', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Password is invalid', 401);
    }

    const payload = { id: user.id, username: user.name, email: user.email };
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.jwtService.sign(payload),
    };
  }

  async logout(): Promise<string> {
    const payload = {};
    return this.jwtService.sign(payload);
  }
}

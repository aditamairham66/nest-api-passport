import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, UserResponse } from '../../model/auth.model';
import { UserGuard } from '../../common/guard/user.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async getLogin(@Body() request: LoginRequest): Promise<UserResponse> {
    const login = await this.authService.login(request);
    return login;
  }

  @Get('/logout')
  @UseGuards(UserGuard)
  @HttpCode(200)
  async getLogout(): Promise<string> {
    const token = this.authService.logout();
    return token;
  }
}

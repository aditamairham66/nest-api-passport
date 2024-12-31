import {
  Controller,
  Get,
  Headers,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get('/generate')
  @HttpCode(200)
  async generateToken(
    @Headers('authorization') authorization: string,
  ): Promise<{ token: string }> {
    try {
      const token = await this.tokenService.generateToken(authorization);
      return { token };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Get('/update')
  @HttpCode(200)
  async updateToken(
    @Headers('authorization') authorization: string,
  ): Promise<{ token: string }> {
    try {
      const token = await this.tokenService.updateToken(authorization);
      return { token };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

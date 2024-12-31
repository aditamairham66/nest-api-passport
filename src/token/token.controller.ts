import {
  Controller,
  Get,
  Headers,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { WebResponse } from '../model/web.model';
import { GenerateResponse, UpdateResponse } from '../model/token.model';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get('/generate')
  @HttpCode(200)
  async generateToken(
    @Headers('authorization') authorization: string,
  ): Promise<WebResponse<GenerateResponse>> {
    try {
      const token = await this.tokenService.generateToken(authorization);
      return {
        data: token,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Get('/update')
  @HttpCode(200)
  async updateToken(
    @Headers('authorization') authorization: string,
  ): Promise<WebResponse<UpdateResponse>> {
    try {
      const token = await this.tokenService.updateToken(authorization);
      return {
        data: token,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

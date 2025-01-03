import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { UserGuard } from '../common/guard/user.guard';

@Controller()
export class TestController {
  @Get('/test')
  @UseGuards(UserGuard)
  @HttpCode(200)
  getLogout(): string {
    return 'Page must login first to show';
  }
}

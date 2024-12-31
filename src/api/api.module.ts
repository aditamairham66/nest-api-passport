import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [AuthModule, TokenModule],
  providers: [],
})
export class ApiModule {}

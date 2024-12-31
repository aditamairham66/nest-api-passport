import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [AuthModule, TokenModule, CommonModule],
  providers: [],
})
export class AppModule {}

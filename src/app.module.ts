import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, CommonModule],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ApiModule, CommonModule],
  providers: [],
})
export class AppModule {}

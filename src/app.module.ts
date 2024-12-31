import { ApiModule } from './api/api.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
      },
    ]),
    CommonModule,
  ],
  providers: [],
})
export class AppModule {}

import { TestController } from './test.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [],
})
export class TestModule {}

import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}

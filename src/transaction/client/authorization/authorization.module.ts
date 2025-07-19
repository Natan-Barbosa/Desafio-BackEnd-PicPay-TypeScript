import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthorizationClient } from './authorization.client';

@Module({
  imports: [HttpModule],
  providers: [AuthorizationClient],
  exports: [AuthorizationClient],
})
export class AuthorizationModule {}

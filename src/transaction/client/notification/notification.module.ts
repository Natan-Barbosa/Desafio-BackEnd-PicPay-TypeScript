import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NotificationClient } from './notification.client';

@Module({
  imports: [HttpModule],
  providers: [NotificationClient],
  exports: [NotificationClient],
})
export class NotificationModule {}

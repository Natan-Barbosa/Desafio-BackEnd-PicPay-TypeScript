import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from 'src/wallet/entity/wallet.entity';
import { AuthorizationModule } from './client/authorization/authorization.module';
import { NotificationModule } from './client/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity]),
    AuthorizationModule,
    NotificationModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}

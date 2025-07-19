import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from 'src/wallet/entity/wallet.entity';
import { AuthorizationModule } from './client/authorization/authorization.module';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity]), AuthorizationModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}

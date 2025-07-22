import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TransactionDto } from './dto/transaction.dto';
import { WalletEntity } from '../wallet/entity/wallet.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthorizationClient } from './client/authorization/authorization.client';
import { NotificationClient } from './client/notification/notification.client';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,

    @InjectDataSource()
    private datasource: DataSource,

    @Inject()
    private authorizationClient: AuthorizationClient,

    @Inject()
    private notificationClient: NotificationClient,
  ) {}

  public async executeTransaction(dto: TransactionDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const sender = await this.walletRepository.findOneBy({
        id: dto.senderId,
      });
      const receiver = await this.walletRepository.findOneBy({
        id: dto.receiverId,
      });
      if (!sender || !receiver) {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException('Receiver Or Sender Not Found');
      }
      if (sender.isSeller()) {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException('Seller Cannot Make Transactions!');
      }
      if (!sender.hasSufficientMoneyToTransaction(dto.value)) {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException(
          'You Dont Have Sufficient Money To Transacion, You Balance Is ' +
            sender.balance,
        );
      }
      await this.authorizationClient.isAuthorized();

      const transaction = new TransactionEntity();
      transaction.receiver = receiver;
      transaction.sender = sender;
      transaction.timeStamp = new Date();
      transaction.value = dto.value;

      //Type orm não inicializa um array vazio automaticamente na entidade
      if (!sender.sentTransactions) {
        sender.sentTransactions = [];
      }
      if (!receiver.receivedTransactions) {
        receiver.receivedTransactions = [];
      }

      sender.sentTransactions.push(transaction);
      receiver.receivedTransactions.push(transaction);

      sender.decreaseBalance(dto.value);
      receiver.increaseBalance(dto.value);

      const savedSender = await this.walletRepository.save(sender);
      await this.walletRepository.save(receiver);
      this.notificationClient.notify();
      return (
        'Transaction Realized With Succesful, You Current Balance Is: ' +
        savedSender.balance
      );
    } catch (error) {
      this.logger.error(error);
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Internal server error occurred');
    } finally {
      await queryRunner.release();
    }
  }
}

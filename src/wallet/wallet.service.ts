import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from 'src/Entities/WalletEntity/wallet.entity';
import { Repository } from 'typeorm';
import { WalletCreateDto } from './dto/wallet.create.dto';
import { plainToInstance } from 'class-transformer';
import { WalletNotFoundException } from './exceptions/wallet.not.found.exception';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
  ) {}

  async createWallet(data: WalletCreateDto) {
    const entity = plainToInstance(WalletEntity, data);
    const createdWallet = await this.walletRepository.save(entity);
    return createdWallet;
  }

  async getWalletById(id: string) {
    const findedWallet = await this.walletRepository.findOneBy({ id });
    if (findedWallet == null) {
      this.logger.error('Wallet Not Found Exception Throw');
      throw new WalletNotFoundException();
    }
    return findedWallet;
  }
}

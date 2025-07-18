import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from 'src/Entities/WalletEntity/wallet.entity';
import { Repository } from 'typeorm';
import { WalletCreateDto } from './dto/wallet.create.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WalletService {
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
      throw new BadRequestException('Wallet Not Found, Verify The Sent Data');
    }
    return findedWallet;
  }
}

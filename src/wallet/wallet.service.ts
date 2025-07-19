import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletCreateDto } from './dto/wallet.create.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { WalletNotFoundException } from './exceptions/wallet.not.found.exception';
import { IncreaseBalanceDto } from './dto/wallet.increase.dto';
import { WalletEntity } from './WalletEntity/wallet.entity';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
  ) {}

  async createWallet(data: WalletCreateDto) {
    const entity = plainToInstance(WalletEntity, data);
    const walletAlreadyExists = await this.walletRepository.existsBy({
      cpfOrCnpj: data.cpfOrCnpj,
    });
    if (walletAlreadyExists) {
      throw new BadRequestException('The User Already Exists');
    }

    const createdWallet = await this.walletRepository.save(entity);
    this.logger.log('Wallet Created With Succesful');
    return createdWallet;
  }

  async getWalletById(id: string) {
    const findedWallet = await this.walletRepository.findOneBy({ id });
    if (findedWallet == null) {
      this.logger.error('Wallet Not Found Exception Throw');
      throw new WalletNotFoundException();
    }
    return instanceToPlain(findedWallet);
  }

  async IncreaseBalance(dto: IncreaseBalanceDto) {
    const wallet = await this.walletRepository.findOneBy({
      cpfOrCnpj: dto.cpfOrCnpj,
    });
    if (!wallet) {
      this.logger.error('Wallet Not Found Exception Throw');
      throw new WalletNotFoundException();
    }
    if (dto.password != wallet.password) {
      this.logger.error('Unauthorized Exception Throw');
      throw new UnauthorizedException('UNAUTHORIZED', {
        description: "You're Not Authorized, Verify Your Credentials",
      });
    }
    wallet.balance = Number(wallet.balance) + Number(dto.value);
    const savedData = await this.walletRepository.save(wallet);
    return instanceToPlain(savedData);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletCreateDto } from './dto/wallet.create.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(@Body() body: WalletCreateDto) {
    return await this.walletService.createWallet(body);
  }
}

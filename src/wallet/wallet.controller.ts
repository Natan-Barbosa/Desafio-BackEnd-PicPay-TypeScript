import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletCreateDto } from './dto/wallet.create.dto';
import { FindByIdDto } from './dto/wallet.findbyid.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(@Body() body: WalletCreateDto) {
    return await this.walletService.createWallet(body);
  }

  @Get(':id')
  async getWalletById(@Param() params: FindByIdDto) {
    const serviceResponse = await this.walletService.getWalletById(params.id);
    return serviceResponse;
  }
}

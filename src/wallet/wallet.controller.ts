import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletCreateDto } from './dto/wallet.create.dto';
import { FindByIdDto } from './dto/wallet.findbyid.dto';
import { IncreaseBalanceDto } from './dto/wallet.increase.dto';

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

  @Put()
  async increaseWalletBalance(@Body() body: IncreaseBalanceDto) {
    const serviceResponse = await this.walletService.IncreaseBalance(body);
    return serviceResponse;
  }
}

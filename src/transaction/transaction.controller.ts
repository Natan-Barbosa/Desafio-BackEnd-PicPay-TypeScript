import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  public async executeTransaction(@Body() body: TransactionDto) {
    await this.transactionService.executeTransaction(body);
  }
}

import { BadRequestException } from '@nestjs/common';

export class WalletNotFoundException extends BadRequestException {
  constructor() {
    super('BAD REQUEST', {
      description: 'Wallet Not Found, Verify The Sent Data',
    });
  }
}

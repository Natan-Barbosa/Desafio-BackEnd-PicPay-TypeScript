import { BadRequestException } from '@nestjs/common';

export class InvalidCPFException extends BadRequestException {
  constructor() {
    super('BAD REQUEST', {
      description: 'The Sended CPF Is Invalid, Verify The Sent Data',
    });
  }
}

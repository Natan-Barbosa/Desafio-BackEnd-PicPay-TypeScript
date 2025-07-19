import { BadRequestException } from '@nestjs/common';

export class InvalidCNPJException extends BadRequestException {
  constructor() {
    super('BAD REQUEST', {
      description: 'The Sended CNPJ Is Invalid, Verify Sent Data',
    });
  }
}

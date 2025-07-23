import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TransactionDto } from '../../src/transaction/dto/transaction.dto';
import { TransactionController } from '../../src/transaction/transaction.controller';
import { TransactionService } from '../../src/transaction/transaction.service';
import * as request from 'supertest';

const mockTransactionService = {
  executeTransaction: jest.fn(),
};

describe('Transaction Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    jest.clearAllMocks();
  });

  const mockTransactionDto = new TransactionDto();
  mockTransactionDto.receiverId = 'fakeReceiverId';
  mockTransactionDto.senderId = 'fakeSenderId';
  mockTransactionDto.value = Number(100);

  const invalidMockTransactionDto = new TransactionDto();

  describe('Transaction Controller', () => {
    it('Should Execute Transaction With Success', () => {
      return request(app.getHttpServer())
        .post('/transaction')
        .send(mockTransactionDto)
        .expect(201);
    });

    it('Should Return Bad Request Because Dto Is Invalid', () => {
      console.log(invalidMockTransactionDto);
      return request(app.getHttpServer())
        .post('/transaction')
        .send(invalidMockTransactionDto)
        .expect(400);
    });
  });
});

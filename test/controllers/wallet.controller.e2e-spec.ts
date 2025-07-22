import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from '../../src/wallet/wallet.controller';
import { WalletService } from '../../src/wallet/wallet.service';
import { WalletCreateDto } from '../../src/wallet/dto/wallet.create.dto';
import { walletType } from '../../src/wallet/entity/wallet.enum';
import { WalletEntity } from '../../src/wallet/entity/wallet.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { IncreaseBalanceDto } from '../../src/wallet/dto/wallet.increase.dto';

const mockService = {
  createWallet: jest.fn(),
  getWalletById: jest.fn(),
  IncreaseBalance: jest.fn(),
};

describe('WalletController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [{ provide: WalletService, useValue: mockService }],
    }).compile();

    app = module.createNestApplication();
    app = app.useGlobalPipes(new ValidationPipe());
    await app.init();
    jest.clearAllMocks();
    await app.close();
  });

  const mockCreateWalletDto = new WalletCreateDto();
  mockCreateWalletDto.cpfOrCnpj = '12345678901';
  mockCreateWalletDto.email = 'test@email.com.br';
  mockCreateWalletDto.fullName = 'Test Full Name';
  mockCreateWalletDto.password = '12345678';
  mockCreateWalletDto.walletType = walletType.USER;

  const mockCreateWalletInvalidDto = new WalletCreateDto();
  mockCreateWalletDto.cpfOrCnpj = '12345678901';
  mockCreateWalletDto.email = 'test@email.com.br';
  mockCreateWalletDto.fullName = 'Test Full Name';
  mockCreateWalletDto.password = '12345678';
  mockCreateWalletDto.walletType = walletType.USER;

  const mockWalletEntity = new WalletEntity();
  mockWalletEntity.cpfOrCnpj = mockCreateWalletDto.cpfOrCnpj;
  mockWalletEntity.email = mockCreateWalletDto.email;
  mockWalletEntity.fullName = mockCreateWalletDto.fullName;
  mockWalletEntity.password = mockCreateWalletDto.password;
  mockWalletEntity.walletType = mockCreateWalletDto.walletType;
  mockWalletEntity.balance = 0;
  mockWalletEntity.id = '10291209210';

  const mockIncreaseBalanceDto = new IncreaseBalanceDto();
  mockIncreaseBalanceDto.cpfOrCnpj = '12345678901';
  mockIncreaseBalanceDto.password = '12345678';
  mockIncreaseBalanceDto.value = 100;
  mockIncreaseBalanceDto.walletType = walletType.USER;

  describe('Create Wallet Controller', () => {
    it('Should Create Wallet With Success', async () => {
      return request(app.getHttpServer())
        .post('/wallet')
        .send(mockCreateWalletDto)
        .expect(201);
    });

    it('Should Throws Error Because Dto Is Invalid', async () => {
      return request(app.getHttpServer())
        .post('/wallet')
        .send(mockCreateWalletInvalidDto)
        .expect(400);
    });
  });

  describe('Get Wallet By Id', () => {
    it('Should Get Wallet With Success', () => {
      return request(app.getHttpServer())
        .get('/wallet/10291209210')
        .expect(200);
    });
  });

  describe('Increase Wallet Balance', () => {
    it('Should Increase Wallet Balance', () => {
      return request(app.getHttpServer())
        .put('/wallet')
        .expect(200)
        .send(mockIncreaseBalanceDto);
    });

    it('Should Throws Exception Because Body Is Null', () => {
      return request(app.getHttpServer()).put('/wallet').expect(400).send({});
    });
  });
});

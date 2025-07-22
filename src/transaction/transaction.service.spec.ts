import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WalletEntity } from '../wallet/entity/wallet.entity';
import { AuthorizationClient } from './client/authorization/authorization.client';
import { NotificationClient } from './client/notification/notification.client';
import { TransactionController } from './transaction.controller';
import { DataSource } from 'typeorm';
import { TransactionDto } from './dto/transaction.dto';
import { walletType } from '../wallet/entity/wallet.enum';

const mockRespository = {
  findOneBy: jest.fn(),
  save: jest.fn(),
};

const mockAuthorizationClient = {
  isAuthorized: jest.fn(),
};

const mockNotificationClient = {
  notify: jest.fn(),
};

const mockQueryRunner = {
  connect: jest.fn(),
  startTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  release: jest.fn(),
};

const mockDataSource = {
  createQueryRunner: jest.fn(() => mockQueryRunner),
};

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(WalletEntity),
          useValue: mockRespository,
        },
        {
          provide: AuthorizationClient,
          useValue: mockAuthorizationClient,
        },
        {
          provide: NotificationClient,
          useValue: mockNotificationClient,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    jest.clearAllMocks();
  });

  const mockTransactionDto = new TransactionDto();
  mockTransactionDto.receiverId = 'FakeReceiverId';
  mockTransactionDto.senderId = 'FakeSenderId';
  mockTransactionDto.value = 100;

  const invalidMockWalletEntitySenderSeller = new WalletEntity();
  invalidMockWalletEntitySenderSeller.id = 'FakeSenderId';
  invalidMockWalletEntitySenderSeller.fullName = 'Full Name Test';
  invalidMockWalletEntitySenderSeller.cpfOrCnpj = '12345678901234';
  invalidMockWalletEntitySenderSeller.email = 'test@email.com.br';
  invalidMockWalletEntitySenderSeller.walletType = walletType.SELLER;

  const invalidMockWalletEntityWithInsufficientBalance = new WalletEntity();
  invalidMockWalletEntityWithInsufficientBalance.id = 'FakeSenderId';
  invalidMockWalletEntityWithInsufficientBalance.fullName = 'Full Name Test';
  invalidMockWalletEntityWithInsufficientBalance.cpfOrCnpj = '89654097265';
  invalidMockWalletEntityWithInsufficientBalance.email = 'test@email.com.br';
  invalidMockWalletEntityWithInsufficientBalance.walletType = walletType.USER;
  invalidMockWalletEntityWithInsufficientBalance.balance = 10;

  const validMockWalletEntitySender = new WalletEntity();
  validMockWalletEntitySender.id = 'FakeSenderId';
  validMockWalletEntitySender.fullName = 'Full Name Test';
  validMockWalletEntitySender.cpfOrCnpj = '89654097265';
  validMockWalletEntitySender.email = 'test@email.com.br';
  validMockWalletEntitySender.walletType = walletType.USER;
  validMockWalletEntitySender.balance = 200;

  const validMockWalletEntitySenderWithDecreaseBalance = new WalletEntity();
  validMockWalletEntitySenderWithDecreaseBalance.id = 'FakeSenderId';
  validMockWalletEntitySenderWithDecreaseBalance.fullName = 'Full Name Test';
  validMockWalletEntitySenderWithDecreaseBalance.cpfOrCnpj = '89654097265';
  validMockWalletEntitySenderWithDecreaseBalance.email = 'test@email.com.br';
  validMockWalletEntitySenderWithDecreaseBalance.walletType = walletType.USER;
  validMockWalletEntitySenderWithDecreaseBalance.balance =
    200 - Number(mockTransactionDto.value);

  const validMockWalletEntityReceiver = new WalletEntity();
  validMockWalletEntityReceiver.id = 'FakeReceiverId';
  validMockWalletEntityReceiver.fullName = 'Full Name Test';
  validMockWalletEntityReceiver.cpfOrCnpj = '89654097265';
  validMockWalletEntityReceiver.email = 'test@email.com.br';
  validMockWalletEntityReceiver.walletType = walletType.USER;

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should Throws BadRequestException Because Sender And Receiver Is Null', async () => {
    mockRespository.findOneBy.mockResolvedValue(null);

    await expect(
      service.executeTransaction(mockTransactionDto),
    ).rejects.toThrow('Receiver Or Sender Not Found');

    expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    expect(mockAuthorizationClient.isAuthorized).not.toHaveBeenCalled();
    expect(mockRespository.save).not.toHaveBeenCalled();
    expect(mockNotificationClient.notify).not.toHaveBeenCalled();
  });

  it('Should Throws BadRequestException Because The Returned Sender Is Seller', async () => {
    mockRespository.findOneBy.mockImplementation(({ id }) => {
      if (id == 'FakeSenderId') {
        return Promise.resolve(invalidMockWalletEntitySenderSeller);
      } else {
        return Promise.resolve(validMockWalletEntityReceiver);
      }
    });

    await expect(
      service.executeTransaction(mockTransactionDto),
    ).rejects.toThrow('Seller Cannot Make Transactions!');

    expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    expect(mockAuthorizationClient.isAuthorized).not.toHaveBeenCalled();
    expect(mockRespository.save).not.toHaveBeenCalled();
    expect(mockNotificationClient.notify).not.toHaveBeenCalled();
  });

  it('Should Throws BadRequestException Because Sender Has Not Sufficient Balance To Transaction', async () => {
    mockRespository.findOneBy.mockImplementation(({ id }) => {
      if (id == 'FakeSenderId') {
        return Promise.resolve(invalidMockWalletEntityWithInsufficientBalance);
      } else {
        return Promise.resolve(validMockWalletEntityReceiver);
      }
    });

    await expect(
      service.executeTransaction(mockTransactionDto),
    ).rejects.toThrow(
      'You Dont Have Sufficient Money To Transacion, You Balance Is ' +
        invalidMockWalletEntityWithInsufficientBalance.balance,
    );

    expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    expect(mockAuthorizationClient.isAuthorized).not.toHaveBeenCalled();
    expect(mockRespository.save).not.toHaveBeenCalled();
    expect(mockNotificationClient.notify).not.toHaveBeenCalled();
  });

  it('Should Make Transaction With Success', async () => {
    mockRespository.findOneBy.mockImplementation(({ id }) => {
      if (id == 'FakeSenderId') {
        return Promise.resolve(validMockWalletEntitySender);
      } else {
        return Promise.resolve(validMockWalletEntityReceiver);
      }
    });
    mockAuthorizationClient.isAuthorized.mockResolvedValue(null);
    mockRespository.save.mockResolvedValue(
      validMockWalletEntitySenderWithDecreaseBalance,
    );

    const serviceResponse =
      await service.executeTransaction(mockTransactionDto);

    expect(serviceResponse).not.toBeNull();
    expect(mockQueryRunner.rollbackTransaction).not.toHaveBeenCalled();
    expect(mockAuthorizationClient.isAuthorized).toHaveBeenCalled();
    expect(mockRespository.save).toHaveBeenCalledTimes(2);
    expect(mockNotificationClient.notify).toHaveBeenCalled();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WalletEntity } from '../../entity/wallet.entity';
import { WalletService } from '../../wallet.service';
import { WalletController } from '../../wallet.controller';

const mockRepository = {
  findOneBy: jest.fn(),
};

describe('Get Wallet By Id', () => {
  let service: WalletService;

  const mockWalletEntity = new WalletEntity();
  mockWalletEntity.id = '123456021821812';
  mockWalletEntity.fullName = 'Full Name Test';
  mockWalletEntity.cpfOrCnpj = '12345678901';
  mockWalletEntity.email = 'test@email.com.br';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: getRepositoryToken(WalletEntity), useValue: mockRepository },
      ],
      controllers: [WalletController],
    }).compile();

    service = module.get<WalletService>(WalletService);
    jest.clearAllMocks();
  });

  it('Should WalletNotFoundException Because Wallet Not Found', async () => {
    mockRepository.findOneBy.mockResolvedValue(null);

    await expect(service.getWalletById('TestId')).rejects.toThrow(
      'BAD REQUEST',
    );
  });

  it('Should Return Wallet With Succesful Without Password', async () => {
    mockRepository.findOneBy.mockResolvedValue(mockWalletEntity);

    const serviceResponse = await service.getWalletById(mockWalletEntity.id);

    expect(serviceResponse).not.toBeNull();
    expect(serviceResponse).toEqual(mockWalletEntity);
    expect(serviceResponse.password).toBeUndefined();
  });
});

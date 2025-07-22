import { Test } from '@nestjs/testing';
import { WalletService } from '../../wallet.service';
import { WalletController } from '../../wallet.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WalletEntity } from '../../entity/wallet.entity';
import { IncreaseBalanceDto } from '../../dto/wallet.increase.dto';
import { walletType } from '../../entity/wallet.enum';

const mockRepository = {
  findOneBy: jest.fn(),
  save: jest.fn(),
};

describe('Increase Balance', () => {
  let service: WalletService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        WalletService,
        { provide: getRepositoryToken(WalletEntity), useValue: mockRepository },
      ],
    }).compile();
    service = module.get<WalletService>(WalletService);
  });

  const mockDto = new IncreaseBalanceDto();
  mockDto.cpfOrCnpj = '12345678901';
  mockDto.password = '123456789';
  mockDto.value = 100;
  mockDto.walletType = walletType.USER;

  const invalidMockDto = new IncreaseBalanceDto();
  invalidMockDto.cpfOrCnpj = '12345678901';
  invalidMockDto.password = '12345678';
  invalidMockDto.value = 100;
  invalidMockDto.walletType = walletType.USER;

  const mockWalletEntity = new WalletEntity();
  mockWalletEntity.id = '123456021821812';
  mockWalletEntity.fullName = 'Full Name Test';
  mockWalletEntity.cpfOrCnpj = '12345678901';
  mockWalletEntity.email = 'test@email.com.br';
  mockWalletEntity.password = '123456789';
  mockWalletEntity.walletType = walletType.USER;
  mockWalletEntity.balance = 0;

  it('Should Throw WalletNotFoundException When Wallet Not Found', async () => {
    mockRepository.findOneBy.mockReturnValue(null);

    await expect(service.IncreaseBalance(mockDto)).rejects.toThrow(
      'BAD REQUEST',
    );
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('Should Throw UnauthorizedException Because Dto Password Is Different Of Wallet Entity', async () => {
    mockRepository.findOneBy.mockReturnValue(mockWalletEntity);

    await expect(service.IncreaseBalance(invalidMockDto)).rejects.toThrow(
      'UNAUTHORIZED',
    );
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('Should Increase Balance With Successful', async () => {
    mockRepository.findOneBy.mockReturnValue(mockWalletEntity);
    mockRepository.save.mockReturnValue(mockWalletEntity);

    const serviceResponse = await service.IncreaseBalance(mockDto);

    expect(serviceResponse).not.toBeNull();
    expect(serviceResponse.cpfOrCnpj).toEqual(mockDto.cpfOrCnpj);
    expect(mockRepository.save).toHaveBeenCalled();
    expect(Number(serviceResponse._balance)).toBeGreaterThanOrEqual(
      Number(mockDto.value),
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from '../../wallet.service';
// import { Repository } from 'typeorm';
import { WalletEntity } from '../../entity/wallet.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WalletCreateDto } from '../../dto/wallet.create.dto';
import { walletType } from '../../entity/wallet.enum';

const mockRepository = {
  existsBy: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
};

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: getRepositoryToken(WalletEntity), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Wallet', () => {
    const mockWalletDto = new WalletCreateDto();
    mockWalletDto.password = '12345678';
    mockWalletDto.cpfOrCnpj = '12345678901';
    mockWalletDto.email = 'test@email.com.br';
    mockWalletDto.fullName = 'Full Name Test';
    mockWalletDto.walletType = walletType.USER;

    const mockWalletEntity = new WalletEntity();
    mockWalletEntity.id = '123456021821812';
    mockWalletEntity.fullName = 'Full Name Test';
    mockWalletEntity.cpfOrCnpj = '12345678901';
    mockWalletEntity.email = 'test@email.com.br';
    mockWalletEntity.password = '12345678';

    it('Should Create A Wallet With Succesful', async () => {
      mockRepository.existsBy.mockResolvedValue(false);
      mockRepository.save.mockResolvedValue(mockWalletEntity);

      const serviceResponse = await service.createWallet(mockWalletDto);

      expect(serviceResponse).not.toBeNull();
      expect(mockRepository.existsBy).toHaveBeenCalledWith({
        cpfOrCnpj: mockWalletDto.cpfOrCnpj,
      });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(serviceResponse.cpfOrCnpj).toEqual(mockWalletEntity.cpfOrCnpj);
    });

    it('Should Throws BadRequestException Because User Already Exists', async () => {
      mockRepository.existsBy.mockResolvedValue(true);

      await expect(service.createWallet(mockWalletDto)).rejects.toThrow(
        'The User Already Exists',
      );

      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });
});

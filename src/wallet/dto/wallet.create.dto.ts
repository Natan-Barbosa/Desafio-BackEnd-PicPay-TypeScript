import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { walletType } from '../entity/wallet.enum';

export class WalletCreateDto {
  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  fullName: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  cpfOrCnpj: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  walletType: walletType;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @Length(8, 64, { message: 'Password Must Between 8 and 64 characters ' })
  password: string;
}

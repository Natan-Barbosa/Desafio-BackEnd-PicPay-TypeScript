import { walletType } from 'src/Entities/WalletEntity/wallet.enum';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class WalletCreateDto {
  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  private fullName: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  private cpfOrCnpj: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsEmail()
  private email: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  private walletType: walletType;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @Length(8, 64, { message: 'Password Must Between 8 and 64 characters ' })
  private password: string;
}

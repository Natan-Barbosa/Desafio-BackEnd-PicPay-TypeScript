import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { walletType } from '../entity/wallet.enum';
import { ApiProperty } from '@nestjs/swagger';

export class WalletCreateDto {
  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @ApiProperty()
  fullName: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @ApiProperty()
  cpfOrCnpj: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @ApiProperty()
  walletType: walletType;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @Length(8, 64, { message: 'Password Must Between 8 and 64 characters ' })
  @ApiProperty()
  password: string;
}

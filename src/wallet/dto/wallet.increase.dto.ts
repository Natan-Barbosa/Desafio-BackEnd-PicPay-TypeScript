import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { walletType } from '../entity/wallet.enum';

export class IncreaseBalanceDto {
  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsString({ message: 'Field Must Be String' })
  @MinLength(11)
  @MaxLength(14)
  cpfOrCnpj: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsString({ message: 'Field Must Be String' })
  password: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsString({ message: 'Field Must Be String' })
  walletType: walletType;

  @IsPositive({ message: 'Field Cannot Be Negative Or Zero' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  value: number;
}

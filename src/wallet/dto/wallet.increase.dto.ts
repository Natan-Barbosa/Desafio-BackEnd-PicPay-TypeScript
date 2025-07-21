import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { walletType } from '../entity/wallet.enum';
import { ApiProperty } from '@nestjs/swagger';

export class IncreaseBalanceDto {
  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsString({ message: 'Field Must Be String' })
  @MinLength(11)
  @MaxLength(14)
  @ApiProperty()
  cpfOrCnpj: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsString({ message: 'Field Must Be String' })
  @ApiProperty()
  password: string;

  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsString({ message: 'Field Must Be String' })
  @ApiProperty()
  walletType: walletType;

  @IsPositive({ message: 'Field Cannot Be Negative Or Zero' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @ApiProperty()
  value: number;
}

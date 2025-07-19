import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsString({ message: 'Field Must Be String' })
  senderId: string;

  @IsString({ message: 'Field Must Be String' })
  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  receiverId: string;

  @IsPositive({ message: 'Field Cannot Be Negative Or Zero' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  value: number;
}

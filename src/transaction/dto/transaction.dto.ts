import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @IsString({ message: 'Field Must Be String' })
  @ApiProperty()
  senderId: string;

  @IsString({ message: 'Field Must Be String' })
  @IsNotEmpty({ message: 'Field Cannot Be Empty' })
  @ApiProperty()
  receiverId: string;

  @IsPositive({ message: 'Field Cannot Be Negative Or Zero' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @ApiProperty()
  value: number;
}

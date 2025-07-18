import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WalletEntity } from '../WalletEntity/wallet.entity';

@Entity('transaction_table')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.receivedTransactions)
  receiver: WalletEntity;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.sentTransactions)
  sender: WalletEntity;

  @Column({
    name: 'value',
    default: 0,
    nullable: false,
    precision: 10,
    scale: 2,
    type: 'decimal',
  })
  private value: number;

  @Column({ name: 'timestamp', nullable: false })
  private timeStamp: Date;
}

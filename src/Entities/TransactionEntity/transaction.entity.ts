import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WalletEntity } from '../WalletEntity/wallet.entity';

@Entity('transaction_table')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  private _value: number;

  @Column({ name: 'timestamp', nullable: false })
  private _timeStamp: Date;

  /**
   * Getter value
   * @return {number}
   */
  public get value(): number {
    return this._value;
  }

  /**
   * Setter value
   * @param {number} value
   */
  public set value(value: number) {
    this._value = value;
  }

  /**
   * Getter timeStamp
   * @return {Date}
   */
  public get timeStamp(): Date {
    return this._timeStamp;
  }

  /**
   * Setter timeStamp
   * @param {Date} value
   */
  public set timeStamp(value: Date) {
    this._timeStamp = value;
  }
}

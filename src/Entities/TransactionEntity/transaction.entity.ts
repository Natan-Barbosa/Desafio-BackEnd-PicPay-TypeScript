import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WalletEntity } from '../WalletEntity/wallet.entity';

@Entity('transaction_table')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  private _id: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.receivedTransactions)
  private _receiver: WalletEntity;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.sentTransactions)
  private _sender: WalletEntity;

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
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Getter receiver
   * @return {WalletEntity}
   */
  public get receiver(): WalletEntity {
    return this._receiver;
  }

  /**
   * Setter receiver
   * @param {WalletEntity} value
   */
  public set receiver(value: WalletEntity) {
    this._receiver = value;
  }

  /**
   * Getter sender
   * @return {WalletEntity}
   */
  public get sender(): WalletEntity {
    return this._sender;
  }

  /**
   * Setter sender
   * @param {WalletEntity} value
   */
  public set sender(value: WalletEntity) {
    this._sender = value;
  }

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

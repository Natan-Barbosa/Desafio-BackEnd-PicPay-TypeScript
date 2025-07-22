import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { walletType } from './wallet.enum';
import { Exclude } from 'class-transformer';
import { TransactionEntity } from '../../transaction/transaction.entity';

@Entity('wallet_table')
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fullname', length: 255, nullable: false })
  private _fullName: string;

  @Column({ name: 'cpf_or_cnpj', unique: true, nullable: false })
  cpfOrCnpj: string;

  @Column({ name: 'email', unique: true, nullable: false })
  private _email: string;

  @Column({
    name: 'balance',
    type: 'decimal',
    default: 0,
    nullable: false,
    precision: 10,
    scale: 2,
  })
  private _balance: number;

  @Column({ name: 'password', nullable: false })
  @Exclude()
  private _password: string;

  @Column({ name: 'wallet_type', type: 'enum', enum: walletType })
  private _walletType: walletType;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.receiver, {
    cascade: true,
  })
  receivedTransactions: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.sender, {
    cascade: true,
  })
  sentTransactions: TransactionEntity[];

  public increaseBalance(value: number) {
    this._balance = Number(this._balance) + Number(value);
  }

  public decreaseBalance(value: number) {
    this._balance = Number(this._balance) - Number(value);
  }

  public isSeller() {
    return this._walletType == walletType.SELLER;
  }

  public hasSufficientMoneyToTransaction(transactionValue: number) {
    const balance = this._balance;
    const transaction = transactionValue;

    if (balance == 0 || balance < transaction) {
      return false;
    }
    return true;
  }

  /**
   * Getter fullName
   * @return {string}
   */
  public get fullName(): string {
    return this._fullName;
  }

  /**
   * Setter fullName
   * @param {string} value
   */
  public set fullName(value: string) {
    this._fullName = value;
  }

  /**
   * Getter email
   * @return {string}
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set email(value: string) {
    this._email = value;
  }

  /**
   * Getter balance
   * @return {number}
   */
  public get balance(): number {
    return this._balance;
  }

  /**
   * Setter balance
   * @param {number} value
   */
  public set balance(value: number) {
    this._balance = value;
  }

  /**
   * Getter password
   * @return {string}
   */
  public get password(): string {
    return this._password;
  }

  /**
   * Setter password
   * @param {string} value
   */
  public set password(value: string) {
    this._password = value;
  }

  /**
   * Getter walletType
   * @return {walletType}
   */
  public get walletType(): walletType {
    return this._walletType;
  }

  /**
   * Setter walletType
   * @param {walletType} value
   */
  public set walletType(value: walletType) {
    this._walletType = value;
  }
}

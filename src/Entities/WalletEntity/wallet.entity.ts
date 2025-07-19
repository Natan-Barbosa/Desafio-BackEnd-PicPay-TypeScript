import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { walletType } from './wallet.enum';
import { TransactionEntity } from '../TransactionEntity/transaction.entity';
import { Exclude } from 'class-transformer';

@Entity('wallet_table')
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  private _id: string;

  @Column({ name: 'fullname', length: 255, nullable: false })
  private _fullName: string;

  @Column({ name: 'cpf_or_cnpj', unique: true, nullable: false })
  private _cpfOrCnpj: string;

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

  @OneToMany(() => TransactionEntity, (transaction) => transaction.receiver)
  private _receivedTransactions: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.sender)
  private _sentTransactions: TransactionEntity[];

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
   * Getter cpfOrCnpj
   * @return {string}
   */
  public get cpfOrCnpj(): string {
    return this._cpfOrCnpj;
  }

  /**
   * Setter cpfOrCnpj
   * @param {string} value
   */
  public set cpfOrCnpj(value: string) {
    // if(this._walletType==walletType.SELLER && this._cpfOrCnpj.length!=14){

    // }
    this._cpfOrCnpj = value;
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

  /**
   * Getter receivedTransactions
   * @return {TransactionEntity[]}
   */
  public get receivedTransactions(): TransactionEntity[] {
    return this._receivedTransactions;
  }

  /**
   * Setter receivedTransactions
   * @param {TransactionEntity[]} value
   */
  public set receivedTransactions(value: TransactionEntity[]) {
    this._receivedTransactions = value;
  }

  /**
   * Getter sentTransactions
   * @return {TransactionEntity[]}
   */
  public get sentTransactions(): TransactionEntity[] {
    return this._sentTransactions;
  }

  /**
   * Setter sentTransactions
   * @param {TransactionEntity[]} value
   */
  public set sentTransactions(value: TransactionEntity[]) {
    this._sentTransactions = value;
  }
}

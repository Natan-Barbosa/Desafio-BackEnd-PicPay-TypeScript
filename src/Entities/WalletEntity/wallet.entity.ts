import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { walletType } from './wallet.enum';
import { TransactionEntity } from '../TransactionEntity/transaction.entity';

@Entity('wallet_table')
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ name: 'fullname', length: 255, nullable: false })
  private fullName: string;

  @Column({ name: 'cpf_or_cnpj', unique: true, nullable: false })
  private cpfOrCnpj: string;

  @Column({ name: 'email', unique: true, nullable: false })
  private email: string;

  @Column({
    name: 'balance',
    type: 'decimal',
    default: 0,
    nullable: false,
    precision: 10,
    scale: 2,
  })
  private balance: number;

  @Column({ name: 'password', nullable: false })
  private password: string;

  @Column({ name: 'wallet_type', type: 'enum', enum: walletType })
  private walletType: walletType;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.receiver)
  receivedTransactions: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.sender)
  sentTransactions: TransactionEntity[];
}

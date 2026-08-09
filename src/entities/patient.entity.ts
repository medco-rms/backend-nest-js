import {
  ObjectType,
  Field,
  ID,
  GraphQLISODateTime,
  Int,
} from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
@ObjectType()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column({ type: 'int', nullable: true, unique: true })
  @Generated('increment')
  @Field(() => Int, { nullable: true })
  cardNumber!: string;

  @Column()
  @Field()
  firstName!: string;

  @Column()
  @Field()
  lastName!: string;

  @Column()
  @Field()
  gender!: string;

  @Column({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  dateOfBirth!: Date;

  @Column()
  @Field()
  phone!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bloodGroup?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  emergencyContactName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  emergencyContactPhone?: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

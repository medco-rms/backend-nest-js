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
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  firstName!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  middleName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  gender?: string;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => GraphQLISODateTime, { nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  profileImage?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  alternativePhone?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address?: string;

  @Column()
  @Field()
  role!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  departmentId?: string;

  @Column({ type: 'int', nullable: true, unique: true })
  @Generated('increment')
  @Field(() => Int, { nullable: true })
  employeeId?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  specialization?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  education?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  licenseNumber?: string;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => GraphQLISODateTime, { nullable: true })
  licenseExpiryDate?: Date;

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  experienceYears?: number;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => GraphQLISODateTime, { nullable: true })
  joiningDate?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  note?: string;

  @Column({ nullable: true, default: 'ACTIVE' })
  @Field({ nullable: true, defaultValue: 'ACTIVE' })
  status?: string;

  @Column()
  @Field()
  better_auth_id!: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

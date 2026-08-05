import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Examination {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  patientId!: string;

  @Column()
  @Field()
  doctorId!: string;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Field()
  departmentId!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  symptoms?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  diagnosis?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes?: string;

  @Column()
  @Field()
  status!: string;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => GraphQLISODateTime, { nullable: true })
  followUpDate?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}

import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  patientId!: string;

  @Column()
  @Field()
  doctorId!: string;

  @Column({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  appointmentDate!: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  reason?: string;

  @Column()
  @Field()
  status!: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}

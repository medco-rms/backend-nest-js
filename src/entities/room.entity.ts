import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  departmentId!: string;

  @Field({ nullable: true })
  department?: string;

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  capacity?: number;

  @Column()
  @Field()
  status!: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}

import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class TestRequest {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  examinationId!: string;

  @Column()
  @Field()
  testType!: string;

  @Column()
  @Field()
  title!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field()
  status!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  result?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  technicianId?: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  capacity?: number;

  @Column()
  @Field()
  status!: string;
}

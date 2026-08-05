import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class MedicalDocument {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  patientId!: string;

  @Column()
  @Field()
  uploadedBy!: string;

  @Column()
  @Field()
  type!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field()
  fileUrl!: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}

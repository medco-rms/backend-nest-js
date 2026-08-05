import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IsInt, IsString, Min } from 'class-validator';

@ObjectType('PrescriptionMedicine')
export class PrescriptionMedicine {
  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  dosage!: string;

  @Field()
  @IsInt()
  @Min(1)
  quantity!: number;

  @Field()
  @IsString()
  instruction!: string;
}

@Entity()
@ObjectType()
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  examinationId!: string;

  @Column()
  @Field()
  doctorId!: string;

  @Column()
  @Field()
  patientId!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pharmacistId?: string;

  @Column({ type: 'jsonb' })
  @Field(() => [PrescriptionMedicine])
  medicines!: PrescriptionMedicine[];

  @Column()
  @Field()
  status!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  note?: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}

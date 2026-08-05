import { Field, InputType, PartialType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateExaminationDto {
  @Field()
  @IsString()
  patientId!: string;

  @Field()
  @IsString()
  doctorId!: string;

  @Field()
  @IsString()
  title!: string;

  @Field()
  @IsString()
  departmentId!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  symptoms?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field()
  @IsString()
  status!: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  followUpDate?: Date;
}

@InputType()
export class UpdateExaminationDto extends PartialType(CreateExaminationDto) {}

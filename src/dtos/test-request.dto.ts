import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTestRequestDto {
  @Field()
  @IsString()
  examinationId!: string;

  @Field()
  @IsString()
  testType!: string;

  @Field()
  @IsString()
  title!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsString()
  status!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  result?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  technicianId?: string;
}

@InputType()
export class UpdateTestRequestDto extends PartialType(CreateTestRequestDto) {}

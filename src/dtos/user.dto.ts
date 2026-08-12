import {
  Field,
  InputType,
  PartialType,
  GraphQLISODateTime,
  Int,
} from '@nestjs/graphql';
import { IsDate, IsEmail, IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  firstName!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  middleName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  gender?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  alternativePhone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field()
  @IsString()
  role!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  departmentId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  specialization?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  education?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  licenseExpiryDate?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  experienceYears?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  joiningDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  note?: string;
}

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}

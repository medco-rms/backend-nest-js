import {
  Field,
  InputType,
  PartialType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreatePatientDto {
  @Field()
  @IsString()
  firstName!: string;

  @Field()
  @IsString()
  middleName!: string;

  @Field()
  @IsString()
  gender!: string;

  @Field(() => GraphQLISODateTime)
  @Type(() => Date)
  @IsDate()
  dateOfBirth!: Date;

  @Field()
  @IsString()
  phone!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nationalID?: string;

  @Field()
  @IsDate()
  cardNumberExpiryDate!: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;
}

@InputType()
export class UpdatePatientDto extends PartialType(CreatePatientDto) {}

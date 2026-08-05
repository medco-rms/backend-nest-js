import { Field, InputType, PartialType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateAppointmentDto {
  @Field()
  @IsString()
  patientId!: string;

  @Field()
  @IsString()
  doctorId!: string;

  @Field(() => GraphQLISODateTime)
  @Type(() => Date)
  @IsDate()
  appointmentDate!: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  reason?: string;

  @Field()
  @IsString()
  status!: string;
}

@InputType()
export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}

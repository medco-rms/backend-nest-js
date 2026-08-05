import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class PrescriptionMedicineDto {
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

@InputType()
export class CreatePrescriptionDto {
  @Field()
  @IsString()
  examinationId!: string;

  @Field()
  @IsString()
  doctorId!: string;

  @Field()
  @IsString()
  patientId!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  pharmacistId?: string;

  @Field(() => [PrescriptionMedicineDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrescriptionMedicineDto)
  medicines!: PrescriptionMedicineDto[];

  @Field()
  @IsString()
  status!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  note?: string;
}

@InputType()
export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {}

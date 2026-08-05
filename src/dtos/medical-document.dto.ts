import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMedicalDocumentDto {
  @Field()
  @IsString()
  patientId!: string;

  @Field()
  @IsString()
  uploadedBy!: string;

  @Field()
  @IsString()
  type!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsString()
  fileUrl!: string;
}

@InputType()
export class UpdateMedicalDocumentDto extends PartialType(CreateMedicalDocumentDto) {}

import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateDepartmentDto {
  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  type!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}

@InputType()
export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}

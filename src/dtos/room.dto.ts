import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateRoomDto {
  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  departmentId!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @Field()
  @IsString()
  status!: string;
}

@InputType()
export class UpdateRoomDto extends PartialType(CreateRoomDto) {}

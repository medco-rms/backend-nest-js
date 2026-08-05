import { IsString } from 'class-validator';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  firstName!: string;
}

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}

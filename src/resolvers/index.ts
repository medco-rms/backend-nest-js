import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../bases/base.resolver';
import { User } from '../entities/index';
import { UserService } from '../services/index';
import { CreateUserDto, UpdateUserDto } from 'src/dtos';

@Resolver(() => User)
export class UserResolver extends BaseResolver<
  User,
  CreateUserDto,
  UpdateUserDto,
  UserService
>(User, CreateUserDto, UpdateUserDto, 'users') {
  constructor(service: UserService) {
    super(service);
  }
}

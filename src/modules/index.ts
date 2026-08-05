import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/index';
import { UserResolver } from '../resolvers/index';
import { UserService } from '../services/index';

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  providers: [UserResolver, UserService],
})
export class UsersModule {}

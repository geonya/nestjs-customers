import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/curret-user.decorator';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation((returns) => CreateUserOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserInput);
  }

  @Query((returns) => Boolean)
  async getUser() {
    return;
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  async me(@CurrentUser() user: User) {
    return user;
  }
}

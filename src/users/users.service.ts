import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      const exsitingUser = await this.users.findOne({
        where: {
          email: createUserInput.email,
        },
      });
      if (exsitingUser) {
        return {
          ok: false,
          error: '유저가 이미 존재합니다.',
        };
      }
      const user = this.users.create(createUserInput);
      await this.users.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'CreateUser Error',
      };
    }
  }
}

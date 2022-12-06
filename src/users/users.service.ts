import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { GetUserInput, GetUserOutput } from './dtos/get-user.dto';
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

  async getUser(getUserInput: GetUserInput): Promise<GetUserOutput> {
    try {
      const user = await this.users.findOne({ where: { id: getUserInput.id } });
      if (!user) {
        return {
          ok: false,
          error: '유저가 존재하지 않습니다.',
        };
      }
      return {
        ok: true,
        user,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'GetUser Error',
      };
    }
  }
  async validateUser(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) return null;
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid)
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    return user;
  }
}

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';

@InputType('CreateUserInput')
export class CreateUserInput {
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  password: string;
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}

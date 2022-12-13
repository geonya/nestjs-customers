import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';

@InputType('CreateCustomerInput')
export class CreateCustomerInput {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;
}

@ObjectType()
export class CreateCustomerOutput extends CoreOutput {}

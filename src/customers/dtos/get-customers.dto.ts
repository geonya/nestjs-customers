import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';
import { Customer } from '../entities/customer.entity';

@ObjectType()
export class GetCustomersOutput extends CoreOutput {
  @Field((type) => [Customer])
  customers?: Customer[];
}

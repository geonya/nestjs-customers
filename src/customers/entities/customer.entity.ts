import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/core.entity';

@InputType('CustomerInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Customer extends CoreEntity {
  @Column()
  @Field((type) => String)
  firstName: string;

  @Column()
  @Field((type) => String)
  lastName: string;
}

import { InputType, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@InputType('UserInput', { isAbstract: true })
@ObjectType()
@Entity()
export class User {}

import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CustomersService } from './customers.service';
import {
  CreateCustomerInput,
  CreateCustomerOutput,
} from './dtos/create-customer.dto';
import { GetCustomersOutput } from './dtos/get-customers.dto';
import { Customer } from './entities/customer.entity';

@Resolver((of) => Customer)
export class CustomersResolver {
  constructor(private readonly customersServies: CustomersService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => CreateCustomerOutput)
  async createCustomer(
    @Args('input') createCustomerInput: CreateCustomerInput,
  ): Promise<CreateCustomerOutput> {
    console.log(createCustomerInput);
    return this.customersServies.createCustomer(createCustomerInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => GetCustomersOutput)
  async getCustomers(): Promise<GetCustomersOutput> {
    return this.customersServies.getCustomers();
  }
}

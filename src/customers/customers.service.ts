import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCustomerInput,
  CreateCustomerOutput,
} from './dtos/create-customer.dto';
import { GetCustomersOutput } from './dtos/get-customers.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customers: Repository<Customer>,
  ) {}

  async createCustomer(
    createCustomerInput: CreateCustomerInput,
  ): Promise<CreateCustomerOutput> {
    try {
      const customer = this.customers.create(createCustomerInput);
      await this.customers.save(customer);
      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'Create Customer Error',
      };
    }
  }
  async getCustomers(): Promise<GetCustomersOutput> {
    try {
      const customers = await this.customers.find();
      return {
        ok: true,
        customers,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'Get Customers Error',
      };
    }
  }
}

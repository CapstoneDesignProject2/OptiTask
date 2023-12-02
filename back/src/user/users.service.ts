import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.usersRepository.save(user);
  }
  
  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ 
      where: { id: id },
     });
  }

  // TODO: more methods
}

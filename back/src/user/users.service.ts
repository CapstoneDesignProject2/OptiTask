import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.save(user);
  }
  
  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ 
      where: { id: id },
     });
  }

  // TODO: more methods
}

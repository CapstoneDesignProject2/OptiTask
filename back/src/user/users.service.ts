import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10);
    return this.userRepository.save(createUserDTO);
  }
  
  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ 
      where: { id: id },
     });
  }

  // TODO: more methods
}

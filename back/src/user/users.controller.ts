import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    const checkUser = await this.usersService.findOne(createUserDTO.id);
    if (checkUser) {
      throw new Error('User already exists');
    }
    const newUser = await this.usersService.create(createUserDTO);
    delete newUser.password;
    return newUser;
  }

  // TODO: more methods
}

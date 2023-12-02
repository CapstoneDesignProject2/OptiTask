import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() user: User): Promise<User> {
    const checkUser = await this.usersService.findOne(user.id);
    if (checkUser) {
      throw new Error('User already exists');
    }
    const newUser = await this.usersService.create(user);
    delete newUser.password;
    return newUser;
  }

  // TODO: more methods
}

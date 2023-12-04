import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDTO, ModifyUserDTO } from './user-dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('modify')
  @UseGuards(AuthGuard('jwt'))
  async modify(@Body() modifyUserDTO: ModifyUserDTO): Promise<User> {
    return this.usersService.modify(modifyUserDTO);
  }
}

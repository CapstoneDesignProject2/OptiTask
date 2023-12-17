import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDTO, ModifyUserDTO } from './user-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    const checkUser = await this.usersService.findOne(createUserDTO.id);
    if (checkUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const newUser = await this.usersService.create(createUserDTO);
    delete newUser.password;
    return newUser;
  }

  @Post('modify')
  @UseGuards(AuthGuard('jwt'))
  async modify(@Body() modifyUserDTO: ModifyUserDTO): Promise<User> {
    const modifiedUser = await this.usersService.modify(modifyUserDTO);
    delete modifiedUser.password;
    return modifiedUser;
  }
}

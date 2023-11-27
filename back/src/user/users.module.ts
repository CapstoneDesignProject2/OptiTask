import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserProjects } from './entities/userprojects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserProjects])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UserModule {}

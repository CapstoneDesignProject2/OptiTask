import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserProjects } from './entities/userprojects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserProjects])],
    // controllers: [UserController],
    // providers: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from 'src/todo/todo.module';
import { UserModule } from 'src/user/users.module';
import { ProjectRepository } from './project.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Project]), TodoModule, UserModule],
    controllers: [ProjectController],
    providers: [ProjectService, ProjectRepository]
})
export class ProjectModule {}

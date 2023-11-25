import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from '../../project/project.entity';

@Entity()
export class UserProjects {
    @PrimaryGeneratedColumn()
    userId: number;

    @PrimaryGeneratedColumn()
    projectId: number;

    @ManyToOne(() => User, user => user.userId)
    user: User;

    @ManyToOne(() => Project, project => project.projectId)
    project: Project;
}

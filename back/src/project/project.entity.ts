import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    projectId: number;

    @Column({ length: 255 })
    projectName: string;

    @Column()
    deadline: Date;

    @ManyToOne(type => User, user => user.projects)
    user: User;
}

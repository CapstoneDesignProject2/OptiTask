import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    reportId: number;

    @ManyToOne(() => Project, project => project.projectId)
    project: Project;

    @Column()
    reportWeek: number;

    @Column()
    weeklyTotalTime: number;

    @Column()
    successTodo: number;
}

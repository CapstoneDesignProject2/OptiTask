import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    projectId: number;

    @Column({ length: 255 })
    projectName: string;

    @Column()
    deadline: Date;
}

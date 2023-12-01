import { Todo } from 'src/todo/todo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    projectId: number;

    @Column({ length: 255 })
    projectName: string;

    @Column()
    deadline: Date;

    @OneToMany(() => Todo, todo => todo.project)
    todos: Todo[];
}

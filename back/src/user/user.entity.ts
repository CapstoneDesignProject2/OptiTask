import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 255, unique: true, nullable: false })
  id: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @OneToMany(type => Project, project => project.user)
  projects: Project[];
}
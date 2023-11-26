import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 255, unique: true, nullable: false })
  id: string;

  @Column({ length: 255, nullable: false })
  password: string;
}
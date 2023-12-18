import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Project } from './project.entity';
import { User } from 'src/user/user.entity';

export class CreateProjectRequest {
  @IsOptional()
  @IsInt()
  userId?: number;
  
  @IsString()
  readonly projectName: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => String)
  readonly todoList: string[];

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly deadline: Date;
}
export class UpdateProjectRequest {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsInt()
  readonly projectId: number;

  @IsOptional()
  @IsString()
  readonly projectName?: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly deadline?: Date;
}
export class DeleteProejctRequest {
  @IsInt()
  projectId: number;
}
export class FindAllProjectResponse{
  @IsArray()
  @IsNotEmpty()
  @Type(() => Project)
  readonly AllProjects: Project[]

  constructor(projects: Project[]) {
    this.AllProjects = projects
  }
}
export class FindOneProjectResponse{
  projectId: number;
  projectName: string;
  deadline: Date;
  user: User;

  constructor(project: Project) {
    this.projectId = project.projectId;
    this.projectName = project.projectName;
    this.deadline = project.deadline;
    this.user = project.user;
  }
}
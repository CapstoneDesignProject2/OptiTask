import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Project } from './project.entity';

export class CreateProjectRequest {
  @IsInt()
  readonly userId: number;
  
  @IsString()
  readonly projectName: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested( {each: true})
  @Type(() => String)
  readonly todoList: string[];

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly deadline: Date;
}
export class UpdateProjectRequest {
  @IsInt()
  readonly userId: number;

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
  @ValidateNested({ each: true })
  @Type(() => Project)
  readonly AllProjects: Project[]

  constructor(projects: Project[]) {
    this.AllProjects = projects
  }
}
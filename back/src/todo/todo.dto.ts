import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsString, ValidateNested, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Todo } from './todo.entity';

export class AddOneTodoRequest{
  @IsString()
  readonly todoName: string;

  @IsInt()
  readonly projectId: number;
}
export class DeleteOneTodoRequest{
  @IsInt()
  readonly todoId: number;
}
export class StartTodoRequest {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsInt()
  readonly projectId: number;

  @IsInt()
  readonly todoId: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly startTime: Date;
}
export class StopTodoRequest {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsInt()
  readonly projectId: number;
  
  @IsInt()
  readonly todoId: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly stopTime: Date;

  @IsBoolean()
  readonly sucess: boolean;
}
export class FindTodosByProjectIdResponse {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Todo)
  readonly todosByProjectId: Todo[];

  constructor(todos: Todo[]) {
    this.todosByProjectId = todos
  }
}

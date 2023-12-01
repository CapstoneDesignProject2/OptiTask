import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
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
  @IsInt()
  readonly todoId: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly startTime: Date;
}
export class StopTodoRequest {
  @IsInt()
  readonly todoId: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly stopTime: Date;

  @IsBoolean()
  readonly sucess: boolean;
}
export class FindAllTodosResponse {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Todo)
  readonly allTodos: Todo[];

  constructor(todos: Todo[]) {
    this.allTodos = todos
  }
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

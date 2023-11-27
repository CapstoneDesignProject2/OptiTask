export class CreateTodoRequest {
  todoName: string;
  startTime: string;
  endTime: string;
  success: boolean
}

export class UpdateTodoRequest {
  todoId: number;
  todoName: string;
  startTime: string;
  endTime: string;
  success: boolean
}

export class DeleteTodoRequest {
  todoId: number;
}
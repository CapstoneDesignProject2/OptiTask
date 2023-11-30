export class AddOneTodoRequest{
  todoName: string;
  projectId: number;
}
export class DeleteOneTodoRequest{
  todoId: number;
}
export class StartTodoRequest {
  todoId: number;
  startTime: Date;
}
export class StopTodoRequest {
  todoId: number;
  stopTime: Date;
  sucess: boolean;
}


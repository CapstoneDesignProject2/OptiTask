import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddOneTodoRequest, DeleteOneTodoRequest, FindAllTodosResponse, FindTodosByProjectIdResponse, StartTodoRequest, StopTodoRequest } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAllTodo() {
    return new FindAllTodosResponse(this.todoService.findAllTodo());
  }
  @Get(':projectId')
  findTodoByProjectId(@Param('projectId') projectId: number) {
    return new FindTodosByProjectIdResponse(this.todoService.findTodoByProject(projectId));
  }
  // @Patch()
  // addOneTodo(@Body() addOneTodoRequest: AddOneTodoRequest) {
  //   return this.todoService.addOneTodo(addOneTodoRequest);
  // }
  @Delete()
  deleteOneTodo(@Body() deleteOneTodoRequest: DeleteOneTodoRequest) {
    return this.todoService.deleteOneTodo(deleteOneTodoRequest);
  }
  @Post('start')
  startTodo(@Body() startTodoRequest: StartTodoRequest) {
    return this.todoService.startTodo(startTodoRequest);
  }
  @Post('stop')
  pauseTodo(@Body() stopTodoRequest: StopTodoRequest) {
    return this.todoService.stopTodo(stopTodoRequest);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { StartTodoRequest, PauseTodoRequest, EndTodoRequest } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAllTodo() {
    return this.todoService.findAllTodo();
  }
  @Get(':projectId')
  findTodoByProject(@Param('projectId') projectId: number) {
    return this.todoService.findTodoByProject(projectId);
  }
  // @Post()
  // addOneTodo() {
  //   return this.todoService.addOneTodo();
  // }
  // @Delete()
  // deleteOneTodo() {
  //   return this.todoService.deleteOneTodo();
  // }
  // @Post('start')
  // startTodo(@Body() startTodoRequest: StartTodoRequest) {
  //   return this.todoService.startTodo(startTodoRequest);
  // }
  // @Post('pause')
  // pauseTodo(pauseTodoRequest: PauseTodoRequest) {
  //   return this.todoService.pauseTodo(pauseTodoRequest);
  // }
  // @Post('end')
  // endTodo(endTodoRequest: EndTodoRequest) {
  //   return this.todoService.endTodo(endTodoRequest);
  // }
}

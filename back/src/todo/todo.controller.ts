import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoRequest, DeleteTodoRequest, UpdateTodoRequest } from './todo-dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':pastWeeksAgo')
  findWeeklyTodo(@Param('pastWeeksAgo') pastWeeksAgo: number) {
    return this.todoService.findWeeklyTodo(pastWeeksAgo);
  }
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoRequest) {
    return this.todoService.createTodo(createTodoDto);
  }
  @Patch()
  updateTodo(@Body() updateTodoDto: UpdateTodoRequest) {
    return this.todoService.updateTodo(updateTodoDto);
  }
  @Delete()
  deleteTodo(@Body() deleteTodoDto: DeleteTodoRequest) {
    return this.todoService.deleteTodo(deleteTodoDto);
  }
}

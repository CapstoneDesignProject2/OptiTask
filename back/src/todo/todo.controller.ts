import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddOneTodoRequest, DeleteOneTodoRequest, FindTodosByProjectIdResponse, StartTodoRequest, StopTodoRequest } from './todo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':userId/:projectId')
  async findTodoByProjectId(@Param('userId') useId: number, @Param('projectId') projectId: number) {
    return new FindTodosByProjectIdResponse(await this.todoService.findTodosByProjectId(useId, projectId));
  }
  @Patch()
  updateOneTodo(@Body() addOneTodoRequest: AddOneTodoRequest) {
    return this.todoService.addOneTodo(addOneTodoRequest);
  }
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

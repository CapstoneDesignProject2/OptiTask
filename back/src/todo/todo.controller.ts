import { Request, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddOneTodoRequest, DeleteOneTodoRequest, FindTodosByProjectIdResponse, StartTodoRequest, StopTodoRequest } from './todo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':projectId')
  async findTodoByProjectId(@Request() req: any, @Param('projectId') projectId: number) {
    const userId = req.user.userId;
    return new FindTodosByProjectIdResponse(await this.todoService.findTodosByProjectId(userId, projectId));
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
  startTodo(@Request() req: any, @Body() startTodoRequest: StartTodoRequest) {
    startTodoRequest.userId = req.user.userId;
    return this.todoService.startTodo(startTodoRequest);
  }
  @Post('stop')
  pauseTodo(@Request() req: any, @Body() stopTodoRequest: StopTodoRequest) {
    stopTodoRequest.userId = req.user.userId;
    return this.todoService.stopTodo(stopTodoRequest);
  }
}

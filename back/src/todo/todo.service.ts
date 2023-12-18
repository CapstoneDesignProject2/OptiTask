import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { AddOneTodoRequest, DeleteOneTodoRequest, StartTodoRequest, StopTodoRequest } from './todo.dto';
import { Project } from 'src/project/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: TodoRepository
  ) {}

  async findAllTodosByAllUsers() : Promise<Todo[]> {
    return await this.todoRepository.findAllTodosByAllUsers();
  }
  async findAllTodos(userId: number) : Promise<Todo[]> {
    return await this.todoRepository.findAllTodos(userId);
  }
  async findTodosByProjectId(userId: number, projectId: number) : Promise<Todo[]> {
    return await this.todoRepository.findTodosByProjectId(userId, projectId);
  }
  async createTodoByProject(newProject: Project, todoList: string[]) {
    for (const todoName of todoList) {
      const newTodo = await this.todoRepository.createTodo();
      newTodo.todoName = todoName;
      newTodo.project = newProject;
      this.todoRepository.saveTodo(newTodo);
    }
  }
  async addOneTodo(addOneTodoRequest: AddOneTodoRequest) {
    const project = await this.todoRepository.findProjectByProjectId(addOneTodoRequest.projectId);
    const newTodo = await this.todoRepository.createTodo();

    newTodo.project = project;
    newTodo.todoName = addOneTodoRequest.todoName;
    this.todoRepository.save(newTodo);
  }
  deleteTodoByProject(projectId: number) {
    return this.todoRepository.deleteTodoByProjectId(projectId);
  }
  deleteOneTodo(deleteOneTodoRequest: DeleteOneTodoRequest) {
    return this.todoRepository.deleteOneTodo(deleteOneTodoRequest.todoId);
  }
  async startTodo(startTodoRequest: StartTodoRequest) {
    const todo = await this.todoRepository.findOneTodo(startTodoRequest.userId, startTodoRequest.projectId ,startTodoRequest.todoId);

    if (todo.startTime.getTime() === 0) {
      todo.startTime = startTodoRequest.startTime;
    }
    todo.tempTime = startTodoRequest.startTime;
    this.todoRepository.save(todo);
  }
  async stopTodo(stopTodoRequest: StopTodoRequest) {
    const todo = await this.todoRepository.findOneTodo(stopTodoRequest.userId, stopTodoRequest.projectId, stopTodoRequest.todoId);

    todo.endTime = stopTodoRequest.stopTime;
    todo.success = stopTodoRequest.sucess;
    todo.todoTotalTime += this.millisecondsToMinutes(todo.endTime.getTime() - todo.tempTime.getTime());
    this.todoRepository.save(todo);
  }
  millisecondsToMinutes(milliseconds) {
    return milliseconds / 60000;
  }
}

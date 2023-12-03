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

  async findAllTodos() : Promise<Todo[]> {
    return await this.todoRepository.findAllTodos();
  }
  async findTodosByProjectId(projectId: number) : Promise<Todo[]> {
    return await this.todoRepository.findTodosByProjectId(projectId);
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
    const todo = await this.todoRepository.findOneTodo(startTodoRequest.todoId);

    todo.startTime = todo.startTime ? todo.startTime : startTodoRequest.startTime;
    todo.tempTime = startTodoRequest.startTime;
    this.todoRepository.save(todo);
  }
  async stopTodo(stopTodoRequest: StopTodoRequest) {
    const todo = await this.todoRepository.findOneTodo(stopTodoRequest.todoId);

    todo.endTime = stopTodoRequest.stopTime;
    todo.success = stopTodoRequest.sucess;
    todo.todoTotalTime += todo.tempTime.getTime() - todo.endTime.getTime();
    this.todoRepository.save(todo);
  }
}

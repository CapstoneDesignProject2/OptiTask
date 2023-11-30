import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { AddOneTodoRequest, DeleteOneTodoRequest, StartTodoRequest, StopTodoRequest } from './todo.dto';
import { Project } from 'src/project/project.entity';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  constructor(private readonly projectService: ProjectService) {}

  createTodoByProject(newProject: Project, todoList: string[]) {
    todoList.forEach((todoName) => {
      this.todos.push({
        todoId: this.todos.length + 1,
        todoName,
        startTime: null,
        endTime: null,
        success: false,
        project: newProject,
      });
    });
  }
  deleteTodoByProject(projectId: number) {
    this.todos = this.todos.filter((todo) => todo.project.projectId !== projectId);
  }
  findAllTodo() : Todo[] {
    return this.todos
  }
  findTodoByProject(projectId: number) : Todo[] {
    return this.todos.filter((todo) => todo.project.projectId === projectId);
  }
  addOneTodo(addOneTodoRequest: AddOneTodoRequest) {
    let todoProject = this.projectService.findProjectByProjectId(addOneTodoRequest.projectId)
    this.todos.push({
      todoId: this.todos.length + 1,
        todoName: addOneTodoRequest.todoName,
        startTime: null,
        endTime: null,
        success: false,
        project: todoProject,
    })
  }
  deleteOneTodo(deleteOneTodoRequest: DeleteOneTodoRequest) {
    this.todos = this.todos.filter((todo) => todo.todoId !== deleteOneTodoRequest.todoId);
  }
  // startTodo(startTodoRequest: StartTodoRequest) {

  // }
  // stopTodo(stopTodoRequest: StopTodoRequest) {

  // }
  
}

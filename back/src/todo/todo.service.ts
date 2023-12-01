import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { AddOneTodoRequest, DeleteOneTodoRequest, StartTodoRequest, StopTodoRequest } from './todo.dto';
import { Project } from 'src/project/project.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  createTodoByProject(newProject: Project, todoList: string[]) {
    //projectId로 바꾸고 repository로 수정
    todoList.forEach((todoName) => {
      this.todos.push({
        todoId: this.todos.length + 1,
        todoName,
        startTime: null,
        tempTime: null,
        endTime: null,
        todoTotalTime: 0,
        success: false,
        project: newProject,
      });
    });
  }
  deleteTodoByProject(projectId: number) {
    this.todos = this.todos.filter((todo) => todo.project.projectId !== projectId);
  }
  findAllTodo() : Todo[] {
    return this.todos;
  }
  findTodoByProject(projectId: number) : Todo[] {
    return this.todos.filter((todo) => todo.project.projectId === projectId);
  }
  addOneTodo(addOneTodoRequest: AddOneTodoRequest) {
    //projectId로 바꾸고 repository로 수정
    // const todoProject = this.projectService.findProjectByProjectId(addOneTodoRequest.projectId);
    // this.todos.push({
    //   todoId: this.todos.length + 1,
    //     todoName: addOneTodoRequest.todoName,
    //     startTime: null,
    //     tempTime: null,
    //     endTime: null,
    //     todoTotalTime: 0,
    //     success: false,
    //     project: todoProject,
    // });
  }
  deleteOneTodo(deleteOneTodoRequest: DeleteOneTodoRequest) {
    this.todos = this.todos.filter((todo) => todo.todoId !== deleteOneTodoRequest.todoId);
  }
  startTodo(startTodoRequest: StartTodoRequest) {
    this.todos = this.todos.map((todo) => {
      if (todo.todoId === startTodoRequest.todoId) {
        todo.startTime = todo.startTime ? todo.startTime : startTodoRequest.startTime;
        todo.tempTime = startTodoRequest.startTime;
        return todo;
      }
      return todo;
    });
  }
  stopTodo(stopTodoRequest: StopTodoRequest) {
    this.todos = this.todos.map((todo) => {
      if (todo.todoId === stopTodoRequest.todoId) {
        todo.endTime = stopTodoRequest.stopTime;
        todo.success = stopTodoRequest.sucess;
        todo.todoTotalTime += todo.tempTime.getTime() - todo.endTime.getTime();
      }
      return todo;
    });
  }
}

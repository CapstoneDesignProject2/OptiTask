import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { StartTodoRequest, PauseTodoRequest, EndTodoRequest } from './todo.dto';
import { Project } from 'src/project/project.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

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
  // addOneTodo() {}
  // deleteOneTodo() {}
  // startTodo() {}
  // pauseTodo() {}
  // endTodo() {}
}

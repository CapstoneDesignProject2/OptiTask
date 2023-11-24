import { Injectable } from '@nestjs/common';
import { Todo } from './todo-entity';
import { CreateTodoRequest, DeleteTodoRequest, UpdateTodoRequest } from './todo-dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findWeeklyTodo(pastWeeksAgo: number): Todo[] {
    const weeklyTodo: Todo[] = [];
    const startDate = new Date()
    const endDate = new Date()

    startDate.setDate(startDate.getDate() - startDate.getDay() + 1 - (7 * pastWeeksAgo))
    endDate.setDate(startDate.getDate() + 6)

    this.todos.forEach((todo) => {
      let todoStartDate = new Date(todo.startTime);
      let todoEndDate = new Date(todo.endTime);
      if (startDate <= todoStartDate
        && todoEndDate <= endDate) {
        weeklyTodo.push(todo);
      }
    });
    return weeklyTodo;
  }
  createTodo(createTodoRequest: CreateTodoRequest) {
    this.todos.push({
      todoId: this.todos.length + 1,
      todoName: createTodoRequest.todoName,
      startTime: createTodoRequest.startTime,
      endTime: createTodoRequest.endTime,
      success: createTodoRequest.success,
    });
  }
  updateTodo(updateTodoRequest: UpdateTodoRequest) {
    this.todos = this.todos.map((todo) => {
      if (todo.todoId === updateTodoRequest.todoId) {
        return {
          ...todo,
          todoName: updateTodoRequest.todoName,
          startTime: updateTodoRequest.startTime,
          endTime: updateTodoRequest.endTime,
          success: updateTodoRequest.success,
        };
      }
      return todo;
    });
  }
  deleteTodo(deleteTodoRequest: DeleteTodoRequest) {
    this.todos = this.todos.filter((todo) => {
      if (todo.todoId !== deleteTodoRequest.todoId) {
        return todo;
      }
    });
  }
}

import { DataSource, Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { Project } from "src/project/project.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoRepository {
  private readonly todoRepository: Repository<Todo>;
  constructor(private readonly dataSources: DataSource) {
    this.todoRepository = this.dataSources.getRepository(Todo);
  }

  async findAllTodosByAllUsers(): Promise<Todo[]> {
    return this.todoRepository.find()
  }
  async findAllTodos(userId: number): Promise<Todo[]> {
    return this.todoRepository.createQueryBuilder("todo")
        .innerJoinAndSelect("todo.project", "project")
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .getMany();
  }
  async findTodosByProjectId(userId: number, projectId: number): Promise<Todo[]> {
    return this.todoRepository.createQueryBuilder("todo")
        .innerJoinAndSelect("todo.project", "project", "project.projectId = :projectId", { projectId })
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .getMany();
  }
  async findOneTodo(userId: number, projectId: number, todoId: number): Promise<Todo> {
    return this.todoRepository.createQueryBuilder("todo")
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .innerJoinAndSelect("todo.project", "project", "project.projectID = :projectId", { projectId })
        .where("todo.todoId = :todoId", { todoId })
        .getOne();
  }
  async findProjectByProjectId(projectId: number): Promise<Project> {
    const todo = await this.todoRepository.createQueryBuilder("todo")
      .innerJoinAndSelect("todo.project", "project")
      .where("project.projectId = :projectId", { projectId })
      .getOne();

    return todo ? todo.project : null;
  }
  async deleteTodoByProjectId(projectId: number) {
    return await this.todoRepository.createQueryBuilder()
      .delete()
      .from(Todo)
      .where("project.projectId = :projectId", { projectId })
      .execute();
  }
  async deleteOneTodo(todoId: number) {
    return await this.todoRepository.delete(todoId);
  }
  async saveTodo(todo: Todo) {
    return this.todoRepository.save(todo)
  }
  async createTodo(): Promise<Todo>  {
    const newTodo = new Todo();
    newTodo.todoName = "emptyTodo";
    newTodo.startTime = null;
    newTodo.tempTime = null;
    newTodo.endTime = null;
    newTodo.todoTotalTime = 0;
    newTodo.success = false;
    newTodo.project = null;

    return newTodo;
  }
}

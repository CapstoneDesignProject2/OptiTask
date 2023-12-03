import { Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { Project } from "src/project/project.entity";

export class TodoRepository extends Repository<Todo> {

  async findAllTodos(): Promise<Todo[]> {
    return this.find();
  }
  async findTodosByProjectId(projectId: number): Promise<Todo[]> {
    return this.find({ where: {project: {projectId}}});
  }
  async findTodo(todoId: number): Promise<Todo> {
    return this.findOne({where: { todoId } });
  }
  async findProjectByProjectId(projectId: number): Promise<Project> {
    const todo = await this.createQueryBuilder("todo")
      .innerJoinAndSelect("todo.project", "project")
      .where("project.projectId = :projectId", { projectId })
      .getOne();

    return todo ? todo.project : null;
  }
  async deleteTodoByProjectId(projectId: number) {
    return await this.createQueryBuilder()
      .delete()
      .from(Todo)
      .where("project.projectId = :projectId", { projectId })
      .execute();
  }
  async deleteOneTodo(todoId: number) {
    return await this.delete(todoId);
  }
  async saveTodo(todo: Todo) {
    return this.save(todo)
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

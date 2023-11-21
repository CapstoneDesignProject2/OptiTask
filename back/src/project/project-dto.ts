export class CreateProjectRequest {
  projectName: string;
  todoList: string[];
  deadline: Date;
}
export class UpdateProjectRequest {
  projectId: number;
  projectName: string;
  todoList: string[];
  deadline: Date;
}

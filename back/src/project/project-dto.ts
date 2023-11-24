export class CreateProjectRequest {
  projectName: string;
  todoList: string[];
  deadline: string;
}
export class UpdateProjectRequest {
  projectId: number;
  projectName: string;
  todoList: string[];
  deadline: string;
}

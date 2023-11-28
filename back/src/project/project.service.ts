import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { CreateProjectRequest, UpdateProjectRequest, DeleteProejctRequest } from './project.dto';
import { TodoService } from '../todo/todo.service';

@Injectable()
export class ProjectService {
  private projects: Project[] = [];
  constructor(private readonly todoService: TodoService) {}

  findAllProject() : Project[] {
    return this.projects
  }
  createProject(createProjectRequest: CreateProjectRequest){
    let newProject = new Project();
    newProject.projectId = this.projects.length;
    newProject.projectName = createProjectRequest.projectName;
    newProject.deadline = createProjectRequest.deadline;
    this.projects.push(newProject);
    this.todoService.createTodoByProject(newProject, createProjectRequest.todoList);
  }
  updateProject(updateProjectRequest: UpdateProjectRequest) {
    let updateProject = new Project();
    updateProject.projectId = updateProjectRequest.projectId;
    updateProject.projectName = updateProjectRequest.projectName;
    updateProject.deadline = updateProjectRequest.deadline;
    this.projects = this.projects.map((project) => {
      if (project.projectId === updateProjectRequest.projectId) {
        return updateProject;
      }
      return project;
    });
  }
  deleteProject(deleteProejctRequest: DeleteProejctRequest) {
    this.projects = this.projects.filter((project) => project.projectId !== deleteProejctRequest.projectId);
    this.todoService.deleteTodoByProject(deleteProejctRequest.projectId);
  }
}

import { Injectable } from '@nestjs/common';
import { Project } from './project-entity';
import { CreateProjectRequest, UpdateProjectRequest } from './project-dto';

@Injectable()
export class ProjectService {
  private projects: Project[] = [];

  findAllProject() : Project[] {
    return this.projects
  }
  createProject(createProjectRequest: CreateProjectRequest) {
    this.projects.push({
      projectId: this.projects.length + 1,
      projectName: createProjectRequest.projectName,
      todoList: createProjectRequest.todoList,
      deadline: createProjectRequest.deadline,
    });
  }
  updateProject(updateProjectRequest: UpdateProjectRequest) {
    this.projects = this.projects.map((project) => {
      if (project.projectId === updateProjectRequest.projectId) {
        return {
          ...project,
          projectName: updateProjectRequest.projectName,
          todoList: updateProjectRequest.todoList,
          deadline: updateProjectRequest.deadline,
        };
      }
      return project;
    });
  }
}

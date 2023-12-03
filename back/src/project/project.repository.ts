import { Repository } from "typeorm";
import { Project } from "./project.entity";

export class ProjectRepository extends Repository<Project> {

  async findAllProject(): Promise<Project[]> {
    return this.find();
  }
  async findOneProject(projectId: number): Promise<Project> {
    return this.findOne({ where: {projectId}});
  }
  async saveProject(project: Project) {
    return this.save(project)
  }
  async createProject(): Promise<Project>  {
    const newProject = new Project();
    newProject.projectName = "emptyProject";
    newProject.deadline = null;
    newProject.todos = null;

    return newProject;
  }
  async deleteOneProject(projectId: number) {
    return await this.delete(projectId);
  }
}

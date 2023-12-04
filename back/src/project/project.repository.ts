import { Repository } from "typeorm";
import { Project } from "./project.entity";

export class ProjectRepository extends Repository<Project> {

  async findAllProject(userId: number): Promise<Project[]> {
    return this.find({ where: {user: {userId: userId}}});
  }
  async findOneProject(userId: number, projectId: number): Promise<Project> {
    return this.findOne({ where: {user: {userId: userId}, project: {projectId: projectId}} });
  }
  async saveProject(project: Project) {
    return this.save(project)
  }
  async createProject(userId: number): Promise<Project>  {
    const newProject = new Project();
    newProject.projectName = "emptyProject";
    newProject.deadline = null;
    newProject.user = {userId: userId};

    return newProject;
  }
  async deleteOneProject(projectId: number) {
    return await this.delete(projectId);
  }
}

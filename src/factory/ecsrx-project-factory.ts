import {IProject, IProjectFactory } from "@alchemist/core";
import {createExampleProject} from "../examples/example-project";

export class EcsrxProjectFactory implements IProjectFactory
{
    public create = (projectTypeId: string, projectName: string, projectDirectory: string, args?: any): IProject =>
    {
        return createExampleProject(projectName, projectDirectory);
    }
}
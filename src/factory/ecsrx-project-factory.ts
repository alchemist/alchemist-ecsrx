import {IProject, IProjectFactory } from "@alchemist-editor/core";
import {exampleProject} from "@/examples/example-project";

export class EcsrxProjectFactory implements IProjectFactory
{
    public create = (projectTypeId: string, args?: any): IProject =>
    {
        return exampleProject;
    }
}
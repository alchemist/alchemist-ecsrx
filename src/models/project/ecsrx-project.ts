import {Project} from "@alchemist/core";

export class EcsRxProject extends Project
{
    constructor(projectType: string, version: string, projectName: string, outputDirectory: string)
    {
        super(projectType, version, projectName, outputDirectory)
    }
}
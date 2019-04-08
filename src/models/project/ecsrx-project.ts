import {DotNetProject} from "@alchemist/dotnet";
import {EcsrxClassLibraryProjectDescriptor} from "./ecsrx-class-library-project-descriptor";

export class EcsRxProject extends DotNetProject
{
    constructor(projectName: string, outputDirectory: string, projectType = EcsrxClassLibraryProjectDescriptor.type, projectVersion = EcsrxClassLibraryProjectDescriptor.currentVersion)
    {
        super(projectType, projectVersion, projectName, outputDirectory)
    }
}
import {IProjectDescriptor} from "@alchemist-editor/core";
import {EcsrxProjectDetails} from "./ecsrx-project-details";

export class EcsRxProjectDescriptor implements IProjectDescriptor
{
    public projectType = EcsrxProjectDetails.projectType;
    public version = EcsrxProjectDetails.version;

    public tagName = "ecsrx";
    public title = "EcsRx Project";
    public description = `Create a .net class library project that targets the EcsRx framework`;
}
import {IProject} from "@alchemist-editor/core";
import {NamespaceNodeGroup} from "@alchemist-editor/dotnet";

export class EcsRxProject implements IProject
{
    public projectType = "ecsrx-project";
    public version = "0.0.1";

    public nodeGroups: Array<NamespaceNodeGroup> = [];

    public constructor(public projectName = "", public outputDirectory = ""){}
}
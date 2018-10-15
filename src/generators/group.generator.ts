import {INodeGenerator, INode, addGeneratedFileHeader} from "@alchemist-editor/core";
import {NamespaceNodeGroup, addUsings, generateUsings, getAllUsingsFromTypes} from "@alchemist-editor/dotnet";

import {GroupNode} from "../models/nodes/group-node";
import {GroupData} from "../models/data/group-data";
import {EcsRxProject} from "../models/project/ecsrx-project";
import {ModelNode} from "../models/nodes/model-node";

const withComponentsTemplate = (data: GroupData, namespace: string, generator: INodeGenerator) => {
    const usingStatements = getAllUsingsFromTypes(data.requiredComponents);
    addUsings(usingStatements, "System", "System.Collections.Generic", "EcsRx.Groups");

    return `
        ${addGeneratedFileHeader(generator)}
        ${generateUsings(usingStatements)}
            
        namespace ${namespace}.Groups
        {           
            public class ${data.name} : IGroup
            {
                public Type[] RequiredComponents { get; } = new Type[${data.requiredComponents.length}] {
                    ${data.requiredComponents.map(x => `typeof(${x.name}),`)}
                };
                
                public Type[] ExcludedComponents { get; } = new Type[${data.excludedComponents.length}] {
                    ${data.excludedComponents.map(x => `typeof(${x.name}),`)}
                };
            }
        }`;
};

const withoutComponentsTemplate = (data: GroupData, namespace: string) => {
    const usingStatements = ["EcsRx.Groups"];

    return `
        ${generateUsings(usingStatements)}
            
        namespace ${namespace}.Groups
        {           
            public class ${data.name} : EmptyGroup {}
        }`;
};

export class GroupGenerator implements INodeGenerator
{
    public name = "EcsRx Group Generator";
    public replaceExisting = true;
    public version = "1.0.0";

    public canHandleType(node: INode): boolean {
        return node.type.id == GroupNode.NodeType.id;
    }

    public generate(node: GroupNode, group: NamespaceNodeGroup, project: EcsRxProject): Promise<string> {
        let templateOutput;

        if(node.data.requiredComponents.length > 0)
        { templateOutput = withComponentsTemplate(node.data, group.name, this); }
        else
        { templateOutput = withComponentsTemplate(node.data, group.name, this); }

        return Promise.resolve(templateOutput);
    }

    public computeFileLocation(node: ModelNode, group: NamespaceNodeGroup, project: EcsRxProject): string {
        return `${project.outputDirectory}/${group.name}/Groups/${node.data.name}.cs`;
    }
}
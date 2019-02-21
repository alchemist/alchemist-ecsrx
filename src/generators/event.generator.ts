import {INodeGenerator, INode, addGeneratedFileHeader} from "@alchemist/core";
import {NamespaceNodeGroup, addUsings, generateUsings} from "@alchemist/dotnet";

import {EcsRxProject} from "../models/project/ecsrx-project";
import {EventNode} from "../models/nodes/event-node";
import {getAllUsingsFromProperties} from "../generators/helpers/using-helpers";
import {generateProperty} from "../generators/helpers/property-helpers";
import {EventData} from "../models/data/event-data";

const template = (data: EventData, namespace: string, generator: INodeGenerator) => {

    const usingStatements = getAllUsingsFromProperties(data.properties);

    return `
        ${addGeneratedFileHeader(generator)}
        ${generateUsings(usingStatements)}
            
        namespace ${namespace}
        {           
            public class ${data.name}
            {
                ${data.properties.map(generateProperty).join("\r\n")}             
            }
        }`;
};

export class EventGenerator implements INodeGenerator
{
    public name = "EcsRx Event Generator";
    public replaceExisting = true;
    public version = "1.0.0";

    public canHandleType(node: INode): boolean {
        return node.type.id == EventNode.NodeType.id;
    }

    public generate(node: EventNode, group: NamespaceNodeGroup, project: EcsRxProject): Promise<string> {
        const templateOutput = template(node.data, group.name, this);
        return Promise.resolve(templateOutput);
    }

    public computeFileLocation(node: EventNode, group: NamespaceNodeGroup, project: EcsRxProject): string {
        return `${project.outputDirectory}/${group.name}/Events/${node.data.name}.cs`;
    }
}
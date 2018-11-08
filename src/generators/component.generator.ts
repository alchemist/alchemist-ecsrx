import {INodeGenerator, INode, addGeneratedFileHeader} from "@alchemist-editor/core";
import {NamespaceNodeGroup, addUsings, generateUsings} from "@alchemist-editor/dotnet";

import {ComponentData} from "../models/data/component-data";
import {ComponentNode} from "../models/nodes/component-node";
import {EcsRxProject} from "../models/project/ecsrx-project";
import {getAllUsingsFromProperties} from "../generators/helpers/using-helpers";
import {generateReactiveInitializer, generateReactiveProperty} from "../generators/helpers/reactive-helpers";

const template = (data: ComponentData, namespace: string, generator: INodeGenerator) => {

    const hasReactiveProperties = data.properties.some(x => x.isReactive);
    const hasCollectionProperties = data.properties.some(x => x.isReactive);
    const usingStatements = getAllUsingsFromProperties(data.properties);
    addUsings(usingStatements, "EcsRx.Components");

    if(hasReactiveProperties)
    { addUsings(usingStatements, "System", "EcsRx.Reactive"); }

    if(hasCollectionProperties)
    { addUsings(usingStatements, "System.Collections.Generic"); }

    return `
        ${addGeneratedFileHeader(generator)}
        ${generateUsings(usingStatements)}
            
        namespace ${namespace}
        {           
            public class ${data.name} : IComponent ${hasReactiveProperties ? ", IDisposable" : ""}
            {
                ${data.properties.map(generateReactiveProperty).join("\r\n")}
                
                ${hasReactiveProperties || hasCollectionProperties ? `
                public ${data.name}()
                {
                    ${data.properties.filter(x => x.isReactive || x.isCollection).map(generateReactiveInitializer).join("\r\n")}
                }
                ` : ""}
                
                ${hasReactiveProperties ? `
                public void Dispose()
                {
                    ${data.properties.filter(x => x.isReactive).map(x => `${x.name}.Dispose();`).join("\r\n")}
                }
                ` : ""}
            }
        }`;
};

export class ComponentGenerator implements INodeGenerator
{
    public name = "EcsRx Component Generator";
    public replaceExisting = true;
    public version = "1.0.0";

    public canHandleType(node: INode): boolean {
        return node.type.id == ComponentNode.NodeType.id;
    }projectTreeData

    public generate(node: ComponentNode, group: NamespaceNodeGroup, project: EcsRxProject): Promise<string> {
        const templateOutput = template(node.data, group.name, this);
        return Promise.resolve(templateOutput);
    }

    public computeFileLocation(node: ComponentNode, group: NamespaceNodeGroup, project: EcsRxProject): string {
        return `${project.outputDirectory}/${group.name}/Components/${node.data.name}.cs`;
    }
}
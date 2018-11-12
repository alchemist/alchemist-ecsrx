import {INodeGenerator, INode, addGeneratedFileHeader} from "@alchemist/core";
import {NamespaceNodeGroup, addUsings, generateUsings} from "@alchemist/dotnet";

import {generateReactiveInitializer, generateReactiveProperty} from "./helpers/reactive-helpers";
import {ModelData} from "../models/data/model-data";
import {ModelNode} from "../models/nodes/model-node";
import {EcsRxProject} from "../models/project/ecsrx-project";
import {getAllUsingsFromProperties} from "../generators/helpers/using-helpers";
import {
    assignDependencyFromArgs, generateDependency,
    generateDependencyArgs
} from "../generators/helpers/property-helpers";

const template = (data: ModelData, namespace: string, generator: INodeGenerator) => {

    const hasReactiveProperties = data.properties.some(x => x.isReactive);
    const hasCollectionProperties = data.properties.some(x => x.isReactive);
    const hasDependencies = data.dependencies.length > 0;
    const usingStatements = getAllUsingsFromProperties(data.properties);

    if(hasReactiveProperties)
    { addUsings(usingStatements, "System", "EcsRx.Reactive"); }

    return `
        ${addGeneratedFileHeader(generator)}
        ${generateUsings(usingStatements)}
            
        namespace ${namespace}
        {           
            public class ${data.name} ${hasReactiveProperties ? ": IDisposable" : ""}
            {
                ${data.dependencies.map(generateDependency).join("\r\n")}
                ${data.properties.map(generateReactiveProperty).join("\r\n")}
                
                ${hasReactiveProperties || hasCollectionProperties || hasDependencies ? `
                public ${data.name}(${generateDependencyArgs(data.dependencies)})
                {
                    ${data.dependencies.map(assignDependencyFromArgs).join("\r\n")}
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

export class ModelGenerator implements INodeGenerator
{
    public name = "EcsRx Model Generator";
    public replaceExisting = true;
    public version = "1.0.0";

    public canHandleType(node: INode): boolean {
        return node.type.id == ModelNode.NodeType.id;
    }

    public generate(node: ModelNode, group: NamespaceNodeGroup, project: EcsRxProject): Promise<string> {
        const templateOutput = template(node.data, group.name, this);
        return Promise.resolve(templateOutput);
    }

    public computeFileLocation(node: ModelNode, group: NamespaceNodeGroup, project: EcsRxProject): string {
        return `${project.outputDirectory}/${group.name}/Models/${node.data.name}.cs`;
    }
}
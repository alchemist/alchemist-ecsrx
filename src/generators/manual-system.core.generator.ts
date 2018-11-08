import {INodeGenerator, INode, addGeneratedFileHeader} from "@alchemist-editor/core";
import {NamespaceNodeGroup, addUsings, generateUsings} from "@alchemist-editor/dotnet";

import {EcsRxProject} from "../models/project/ecsrx-project";
import {getAllUsingsFromProperties} from "./helpers/using-helpers";
import {
    assignDependencyFromArgs,
    generateDependency,
    generateDependencyArgs
} from "./helpers/property-helpers";
import {ManualSystemNode} from "../models/nodes/manual-system-node";
import {ManualSystemData} from "../models/data/manual-system-data";
import {
    generateReactiveInitializer,
    generateReactiveProperty
} from "../generators/helpers/reactive-helpers";

const template = (data: ManualSystemData, namespace: string, generator: INodeGenerator) => {

    const hasReactiveProperties = data.properties.some(x => x.isReactive);
    const usingStatements = getAllUsingsFromProperties(data.properties);
    addUsings(usingStatements, "EcsRx.Systems");
    addUsings(usingStatements, data.group.namespace);

    if(hasReactiveProperties)
    { addUsings(usingStatements, "System", "EcsRx.Reactive"); }

    return `
        ${addGeneratedFileHeader(generator)}
        ${generateUsings(usingStatements)}
            
        namespace ${namespace}
        {           
            public partial class ${data.name} : IManualSystem ${hasReactiveProperties ? ", IDisposable" : ""}
            {
                ${data.dependencies.map(generateDependency).join("\r\n")}
                ${data.properties.map(generateReactiveProperty).join("\\r\\n")}
            
                public IGroup Group {get;} = new ${data.group.name}();
            
                public ${data.name}(${generateDependencyArgs(data.dependencies)})
                {
                    ${data.dependencies.map(assignDependencyFromArgs).join("\\r\\n")}
                    ${data.properties.filter(x => x.isReactive || x.isCollection).map(generateReactiveInitializer).join("\r\n")}
                }
                
                ${hasReactiveProperties ? `
                partial void Dispose()
                {
                    ${data.properties.filter(x => x.isReactive).map(x => `${x.name}.Dispose();`).join("\r\n")}
                }
                ` : ""}
            }            
        }`;
};

export class ManualSystemCoreGenerator implements INodeGenerator
{
    public name = "EcsRx Manual System Generator";
    public replaceExisting = true;
    public version = "1.0.0";

    public canHandleType(node: INode): boolean {
        return node.type.id == ManualSystemNode.NodeType.id;
    }

    public generate(node: ManualSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): Promise<string> {
        const templateOutput = template(node.data, group.name, this);
        return Promise.resolve(templateOutput);
    }

    public computeFileLocation(node: ManualSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): string {
        return `${project.outputDirectory}/${group.name}/Systems/${node.data.name}.generated.cs`;
    }
}
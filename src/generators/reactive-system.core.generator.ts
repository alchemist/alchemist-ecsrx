import {INodeGenerator, INode, addGeneratedFileHeader} from "@alchemist/core";
import {NamespaceNodeGroup, addUsings, generateUsings} from "@alchemist/dotnet";

import {EcsRxProject} from "../models/project/ecsrx-project";
import {getAllUsingsFromProperties} from "./helpers/using-helpers";
import {
    assignDependencyFromArgs,
    generateDependency,
    generateDependencyArgs
} from "./helpers/property-helpers";
import {ReactiveSystemNode} from "../models/nodes/reactive-system-node";
import {
    generateReactiveInitializer,
    generateReactiveProperty
} from "../generators/helpers/reactive-helpers";

import {ReactiveSystemData} from "../models/data/reactive-system-data";
import {ecsrxReactiveSystemInterfaceTypes} from "..";

const template = (data: ReactiveSystemData, namespace: string, generator: INodeGenerator) => {

    const hasReactiveProperties = data.properties.some(x => x.isReactive);
    const usingStatements = getAllUsingsFromProperties(data.properties);
    addUsings(usingStatements, "EcsRx.Plugins.ReactiveSystems.Systems");
    addUsings(usingStatements, data.group.namespace);

    if(hasReactiveProperties)
    {
        addUsings(usingStatements, "System", "EcsRx.ReactiveData");
        addUsings(usingStatements, "System", "EcsRx.ReactiveData.Collections");
    }

    if(data.genericDataType.namespace)
    { addUsings(usingStatements, data.genericDataType.namespace); }

    const hasReactToDataSystem = data.implementsSystems.indexOf(ecsrxReactiveSystemInterfaceTypes.iReactToDataSystem) >= 0;
    let systemImplementations = data.implementsSystems.map(x => x.name).join(",");

    if(hasReactToDataSystem)
    { systemImplementations = systemImplementations.replace("IReactToDataSystem", `IReactToDataSystem<${data.genericDataType.name}>`); }

    return `
        ${addGeneratedFileHeader(generator)}
        ${generateUsings(usingStatements)}
                    
        namespace ${namespace}
        {           
            public partial class ${data.name} : ${systemImplementations} ${hasReactiveProperties ? ", IDisposable" : ""}
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

export class ReactiveSystemCoreGenerator implements INodeGenerator
{
    public name = "EcsRx Reactive System Generator";
    public replaceExisting = true;
    public version = "1.0.0";

    public canHandleType(node: INode): boolean {
        return node.type.id == ReactiveSystemNode.NodeType.id;
    }

    public generate(node: ReactiveSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): Promise<string> {
        const templateOutput = template(node.data, group.name, this);
        return Promise.resolve(templateOutput);
    }

    public computeFileLocation(node: ReactiveSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): string {
        return `${project.outputDirectory}/${group.name}/Systems/${node.data.name}.generated.cs`;
    }
}
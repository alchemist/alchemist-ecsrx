import {INodeGenerator, INode} from "@alchemist/core";
import {NamespaceNodeGroup, addUsings, generateUsings} from "@alchemist/dotnet";

import {EcsRxProject} from "../models/project/ecsrx-project";
import {ReactiveSystemData} from "../models/data/reactive-system-data";
import {ReactiveSystemNode} from "../models/nodes/reactive-system-node";
import {ecsrxReactiveSystemInterfaceTypes} from "../types/ecsrx-types";

const template = (data: ReactiveSystemData, namespace: string, generator: INodeGenerator) => {

    const usingStatements = [];
    addUsings(usingStatements, "EcsRx.Entities");
    addUsings(usingStatements, "EcsRx.Groups.Observable");
    addUsings(usingStatements, "EcsRx.Plugins.ReactiveSystems.Systems");

    if(data.genericDataType.namespace)
    { addUsings(usingStatements, data.genericDataType.namespace); }

    const hasReactToGroupSystem = data.implementsSystems.indexOf(ecsrxReactiveSystemInterfaceTypes.iReactToGroupSystem) >= 0;
    const hasReactToEntitySystem = data.implementsSystems.indexOf(ecsrxReactiveSystemInterfaceTypes.iReactToEntitySystem) >= 0;
    const hasReactToDataSystem = data.implementsSystems.indexOf(ecsrxReactiveSystemInterfaceTypes.iReactToDataSystem) >= 0;
    const hasSetupSystem = data.implementsSystems.indexOf(ecsrxReactiveSystemInterfaceTypes.iSetupSystem) >= 0;
    const hasTeardownSystem = data.implementsSystems.indexOf(ecsrxReactiveSystemInterfaceTypes.iTeardownSystem) >= 0;

    return `          
        ${generateUsings(usingStatements)}
      
        namespace ${namespace}
        {           
            public partial class ${data.name}
            {
                ${hasReactToGroupSystem ? `
                public IObservable<IObservableGroup> ReactToGroup(IObservableGroup observableGroup)
                {
                    // TODO: Put your logic in here
                }
                ` : ""}
                
                ${hasReactToEntitySystem ? `
                public IObservable<IEntity> ReactToEntity(IEntity entity)
                {
                    // TODO: Put your logic in here
                }
                ` : ""}
                
                ${hasReactToDataSystem ? `
                public IObservable<${data.genericDataType.name}> ReactToData(IEntity entity)
                {
                    // TODO: Put your logic in here
                }
                ` : ""}
                
                ${hasReactToGroupSystem ? `
                void IReactToGroupSystem.Process(IEntity entity)
                {
                    // TODO: Put your logic in here
                }
                ` : ""}
                
                ${hasReactToEntitySystem ? `
                void IReactToEntitySystem.Process(IEntity entity)
                {
                    // TODO: Put your logic in here
                }
                ` : ""}
                
                ${hasReactToDataSystem ? `
                public void Process(IEntity entity, ${data.genericDataType.name} reactionData)
                {
                    // TODO: Put your logic in here
                }
                ` : ""}
                
                ${hasSetupSystem ? `
                public void Setup(IEntity entity)
                {
                    // TODO: Put your logic in here
                }
                ` : ""}
                
                ${hasTeardownSystem ? `
                public void Teardown(IEntity entity)
                {
                    // TODO: Put your logic in here
                }
                ` : ""}
            }            
        }`;
};

export class ReactiveSystemExtendGenerator implements INodeGenerator
{
    public name = "EcsRx Reactive System Extender Generator";
    public replaceExisting = false;
    public version = "1.0.0";

    public canHandleType(node: INode): boolean {
        return node.type.id == ReactiveSystemNode.NodeType.id;
    }

    public generate(node: ReactiveSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): Promise<string> {
        const templateOutput = template(node.data, group.name, this);
        return Promise.resolve(templateOutput);
    }

    public computeFileLocation(node: ReactiveSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): string {
        return `${project.outputDirectory}/${group.name}/Systems/${node.data.name}.cs`;
    }
}
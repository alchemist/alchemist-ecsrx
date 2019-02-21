import {INodeGenerator, INode} from "@alchemist/core";
import {NamespaceNodeGroup, addUsings, generateUsings} from "@alchemist/dotnet";

import {EcsRxProject} from "../models/project/ecsrx-project";
import {ConventionSystemData} from "../models/data/convention-system-data";
import {ConventionSystemNode} from "../models/nodes/convention-system-node";
import {ecsrxSystemInterfaceTypes} from "../types/ecsrx-types";

const template = (data: ConventionSystemData, namespace: string, generator: INodeGenerator) => {

    const usingStatements = [];
    addUsings(usingStatements, "EcsRx.Groups.Observable");

    if(data.genericDataType.namespace)
    { addUsings(usingStatements, data.genericDataType.namespace); }

    const hasReactToGroupSystem = data.implementsSystems.indexOf(ecsrxSystemInterfaceTypes.iReactToGroupSystem) >= 0;
    const hasReactToEntitySystem = data.implementsSystems.indexOf(ecsrxSystemInterfaceTypes.iReactToEntitySystem) >= 0;
    const hasReactToDataSystem = data.implementsSystems.indexOf(ecsrxSystemInterfaceTypes.iReactToDataSystem) >= 0;
    const hasSetupSystem = data.implementsSystems.indexOf(ecsrxSystemInterfaceTypes.iSetupSystem) >= 0;
    const hasTeardownSystem = data.implementsSystems.indexOf(ecsrxSystemInterfaceTypes.iTeardownSystem) >= 0;

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
                public void IReactToGroupSystem.Process(IEntity entity)
                {
                    // TODO: Put your logic in here
                }
                ` : ""}
                
                ${hasReactToEntitySystem ? `
                public void IReactToEntitySystem.Process(IEntity entity)
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

export class ConventionSystemExtendGenerator implements INodeGenerator
{
    public name = "EcsRx Convention System Extender Generator";
    public replaceExisting = false;
    public version = "1.0.0";

    public canHandleType(node: INode): boolean {
        return node.type.id == ConventionSystemNode.NodeType.id;
    }

    public generate(node: ConventionSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): Promise<string> {
        const templateOutput = template(node.data, group.name, this);
        return Promise.resolve(templateOutput);
    }

    public computeFileLocation(node: ConventionSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): string {
        return `${project.outputDirectory}/${group.name}/Systems/${node.data.name}.cs`;
    }
}
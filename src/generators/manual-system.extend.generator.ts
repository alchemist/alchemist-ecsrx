import {INodeGenerator, INode} from "@alchemist/core";
import {NamespaceNodeGroup, addUsings, generateUsings} from "@alchemist/dotnet";
import {EcsRxProject} from "../models/project/ecsrx-project";
import {ManualSystemNode} from "../models/nodes/manual-system-node";
import {ManualSystemData} from "../models/data/manual-system-data";

const template = (data: ManualSystemData, namespace: string, generator: INodeGenerator) => {

    const usingStatements = [];
    addUsings(usingStatements, "EcsRx.Groups.Observable");

    return `          
        ${generateUsings(usingStatements)}
      
        namespace ${namespace}
        {           
            public partial class ${data.name}
            {
                public void StartSystem(IObservableGroup observableGroup)
                {
                    // TODO: Put your logic here
                }
                
                public void StopSystem(IObservableGroup observableGroup)
                {
                    // TODO: Put your logic here
                }
            }            
        }`;
};

export class ManualSystemExtendGenerator implements INodeGenerator
{
    public name = "EcsRx Manual System Extender Generator";
    public replaceExisting = false;
    public version = "1.0.0";

    public canHandleType(node: INode): boolean {
        return node.type.id == ManualSystemNode.NodeType.id;
    }

    public generate(node: ManualSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): Promise<string> {
        const templateOutput = template(node.data, group.name, this);
        return Promise.resolve(templateOutput);
    }

    public computeFileLocation(node: ManualSystemNode, group: NamespaceNodeGroup, project: EcsRxProject): string {
        return `${project.outputDirectory}/${group.name}/Systems/${node.data.name}.cs`;
    }
}
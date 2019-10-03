import {DotNetProjectSerializer} from "@alchemist/dotnet";
import {INode, INodeGroup, IProject, NodeType} from "@alchemist/core";
import {ComponentNode} from "../models/nodes/component-node";
import {EventNode} from "../models/nodes/event-node";
import {GroupNode} from "../models/nodes/group-node";
import {ManualSystemNode} from "../models/nodes/manual-system-node";
import {ModelNode} from "../models/nodes/model-node";
import {ReactiveSystemNode} from "../models/nodes/reactive-system-node";
import {ComponentData} from "../models/data/component-data";
import {GroupData} from "../models/data/group-data";
import {EventData} from "../models/data/event-data";
import {ModelData} from "../models/data/model-data";
import {ManualSystemData} from "../models/data/manual-system-data";
import {ReactiveSystemData} from "../models/data/reactive-system-data";

export class EcsRxProjectSerializer extends DotNetProjectSerializer
{
    protected afterProcessed(project: IProject): void
    {
        for(const nodeGroup of project.nodeGroups)
        {
            for(const node of nodeGroup.nodes)
            { this.processEcsRxNodeTypeReferences(node, nodeGroup, project); }
        }
    }

    protected processEcsRxNodeTypeReferences(node: INode, group: INodeGroup, project: IProject): void
    {
        switch(node.type.id)
        {
            case ComponentNode.NodeType.id: { this.processComponentNode(node as ComponentNode, group, project); } break;
            case EventNode.NodeType.id: { this.processEventNode(node as EventNode, group, project); } break;
            case GroupNode.NodeType.id: { this.processGroupNode(node as GroupNode, group, project); } break;
            case ManualSystemNode.NodeType.id: { this.processManualSystemNode(node as ManualSystemNode, group, project); } break;
            case ReactiveSystemNode.NodeType.id: { this.processReactiveSystemNode(node as ReactiveSystemNode, group, project); } break;
            case ModelNode.NodeType.id: { this.processModelNode(node as ModelNode, group, project); } break;
        }
    }

    public processComponentNode(node: ComponentNode, group: INodeGroup, project: IProject): void
    {
        const dataType = new ComponentData();
        Object.assign(dataType, node.data);
        node.data = dataType;

        for(const property of node.data.properties)
        {
            if(this.hasNodeReferenceMetadata(property.type))
            { property.type = this.getNodeTypeData(project, property.type); }
        }
    }

    public processEventNode(node: EventNode, group: INodeGroup, project: IProject): void
    {
        const dataType = new EventData();
        Object.assign(dataType, node.data);
        node.data = dataType;

        for(const property of node.data.properties)
        {
            if(this.hasNodeReferenceMetadata(property.type))
            { property.type = this.getNodeTypeData(project, property.type); }
        }
    }

    public processGroupNode(node: GroupNode, group: INodeGroup, project: IProject): void
    {
        const dataType = new GroupData();
        Object.assign(dataType, node.data);
        node.data = dataType;
        debugger;

        const requiredComponents = node.data.requiredComponents;
        for(let i=requiredComponents.length-1; i>=0; i--)
        {
            if(this.hasNodeReferenceMetadata(requiredComponents[i]))
            { requiredComponents[i] = this.getNodeTypeData(project, requiredComponents[i]); }
        }

        const excludedComponents = node.data.excludedComponents;
        for(let i=excludedComponents.length-1; i>=0; i--)
        {
            if(this.hasNodeReferenceMetadata(excludedComponents[i]))
            { excludedComponents[i] = this.getNodeTypeData(project, excludedComponents[i]); }
        }
    }

    public processManualSystemNode(node: ManualSystemNode, group: INodeGroup, project: IProject): void
    {
        const dataType = new ManualSystemData();
        Object.assign(dataType, node.data);
        node.data = dataType;

        for(const property of node.data.properties)
        {
            if(this.hasNodeReferenceMetadata(property.type))
            { property.type = this.getNodeTypeData(project, property.type); }
        }

        for(const dependency of node.data.dependencies)
        {
            if(this.hasNodeReferenceMetadata(dependency.type))
            { dependency.type = this.getNodeTypeData(project, dependency.type); }
        }

        if(this.hasNodeReferenceMetadata(node.data.group))
        { node.data.group = this.getNodeTypeData(project, node.data.group); }
    }

    public processReactiveSystemNode(node: ReactiveSystemNode, group: INodeGroup, project: IProject): void
    {
        const dataType = new ReactiveSystemData();
        Object.assign(dataType, node.data);
        node.data = dataType;

        for(const property of node.data.properties)
        {
            if(this.hasNodeReferenceMetadata(property.type))
            { property.type = this.getNodeTypeData(project, property.type); }
        }

        for(const dependency of node.data.dependencies)
        {
            if(this.hasNodeReferenceMetadata(dependency.type))
            { dependency.type = this.getNodeTypeData(project, dependency.type); }
        }

        if(this.hasNodeReferenceMetadata(node.data.group))
        { node.data.group = this.getNodeTypeData(project, node.data.group); }

        if(this.hasNodeReferenceMetadata(node.data.genericDataType))
        { node.data.genericDataType = this.getNodeTypeData(project, node.data.genericDataType); }
    }

    public processModelNode(node: ModelNode, group: INodeGroup, project: IProject): void
    {
        const dataType = new ModelData();
        Object.assign(dataType, node.data);
        node.data = dataType;

        for(const property of node.data.properties)
        {
            if(this.hasNodeReferenceMetadata(property.type))
            { property.type = this.getNodeTypeData(project, property.type); }
        }

        for(const dependency of node.data.dependencies)
        {
            if(this.hasNodeReferenceMetadata(dependency.type))
            { dependency.type = this.getNodeTypeData(project, dependency.type); }
        }
    }
}
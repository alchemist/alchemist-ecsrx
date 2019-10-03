import {INode, INodeFactory, Point} from "@alchemist/core";

import {ComponentNode} from "../models/nodes/component-node";
import {ComponentData} from "../models/data/component-data";
import {ModelNode} from "../models/nodes/model-node";
import {ModelData} from "../models/data/model-data";
import {EventData} from "../models/data/event-data";
import {EventNode} from "../models/nodes/event-node";
import {GroupData} from "../models/data/group-data";
import {GroupNode} from "../models/nodes/group-node";
import {ManualSystemNode} from "../models/nodes/manual-system-node";
import {ManualSystemData} from "../models/data/manual-system-data";
import {ReactiveSystemNode} from "../models/nodes/reactive-system-node";
import {ReactiveSystemData} from "../models/data/reactive-system-data";

export class EcsrxNodeFactory implements INodeFactory
{
    public create = (nodeTypeId: string, position: Point, args: any): INode => {
        switch(nodeTypeId)
        {
            case ComponentNode.NodeType.id: return new ComponentNode(new ComponentData("NewComponent"), position);
            case ModelNode.NodeType.id: return new ModelNode(new ModelData("NewModel"), position);
            case EventNode.NodeType.id: return new EventNode(new EventData("NewEvent"), position);
            case GroupNode.NodeType.id: return new GroupNode(new GroupData("NewGroup"), position);
            case ManualSystemNode.NodeType.id: return new ManualSystemNode(new ManualSystemData("NewManualSystem"), position);
            case ReactiveSystemNode.NodeType.id: return new ReactiveSystemNode(new ReactiveSystemData("NewReactiveSystem"), position);
        }
        return null;
    }
}


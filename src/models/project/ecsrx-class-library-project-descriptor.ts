import {IProjectDescriptor} from "@alchemist/core";
import {ComponentNode} from "../nodes/component-node";
import {ReactiveSystemNode} from "../nodes/reactive-system-node";
import {EventNode} from "../nodes/event-node";
import {GroupNode} from "../nodes/group-node";
import {ManualSystemNode} from "../nodes/manual-system-node";
import {ModelNode} from "../nodes/model-node";
import {NamespaceNodeGroup} from "@alchemist/dotnet";

export class EcsrxClassLibraryProjectDescriptor implements IProjectDescriptor
{
    public static currentVersion = "1.0.0";
    public static type = "ecsrx-class-library";

    public projectCategory = "ecsrx";
    public projectType = EcsrxClassLibraryProjectDescriptor.type;
    public version = EcsrxClassLibraryProjectDescriptor.currentVersion;

    public tagName = "ecsrx";
    public title = "EcsRx Class Library";
    public description = `Create a .net class library project that targets the EcsRx framework`;

    public compatibleNodeTypeIds = [
        ComponentNode.NodeType.id,
        ReactiveSystemNode.NodeType.id,
        EventNode.NodeType.id,
        GroupNode.NodeType.id,
        ManualSystemNode.NodeType.id,
        ModelNode.NodeType.id
    ];

    public compatibleNodeGroupTypeIds = [
        NamespaceNodeGroup.NodeGroupType.id
    ]
}
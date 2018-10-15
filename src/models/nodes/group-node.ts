import {Node, NodeType, Point} from "@alchemist-editor/core";
import {withRuleset} from "@treacherous/decorators";

import {GroupData} from "../data/group-data";

export class GroupNode extends Node<GroupData>
{
    public static NodeType = new NodeType("ecsrx-group", "Group");

    @withRuleset(GroupData)
    public data: GroupData;

    constructor(data: GroupData = new GroupData(), position?: Point)
    {
        super(GroupNode.NodeType, position);
        this.data = data;
    }
}
import {Node, NodeType, Point} from "@alchemist-editor/core";
import {withRuleset} from "@treacherous/decorators";

import {ManualSystemData} from "../data/manual-system-data";

export class ManualSystemNode extends Node<ManualSystemData>
{
    public static NodeType = new NodeType("ecsrx-manual-system", "System - Manual");

    @withRuleset(ManualSystemData)
    public data: ManualSystemData;

    constructor(data = new ManualSystemData(), position?: Point)
    {
        super(ManualSystemNode.NodeType, position);
        this.data = data;
    }
}
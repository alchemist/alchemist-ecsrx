import {Node, NodeType, Point} from "@alchemist/core";
import {withRuleset} from "@treacherous/decorators";

import {ConventionSystemData} from "../data/convention-system-data";

export class ConventionSystemNode extends Node<ConventionSystemData>
{
    public static NodeType = new NodeType("ecsrx-convention-system", "System - Convention");

    @withRuleset(ConventionSystemData)
    public data: ConventionSystemData;

    constructor(data = new ConventionSystemData(), position?: Point)
    {
        super(ConventionSystemNode.NodeType, position);
        this.data = data;
    }
}
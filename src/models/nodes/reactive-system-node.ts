import {Node, NodeType, Point} from "@alchemist/core";
import {withRuleset} from "@treacherous/decorators";

import {ReactiveSystemData} from "../data/reactive-system-data";

export class ReactiveSystemNode extends Node<ReactiveSystemData>
{
    public static NodeType = new NodeType("ecsrx-reactive-system", "System - Reactive");

    @withRuleset(ReactiveSystemData)
    public data: ReactiveSystemData;

    constructor(data = new ReactiveSystemData(), position?: Point)
    {
        super(ReactiveSystemNode.NodeType, position);
        this.data = data;
    }
}
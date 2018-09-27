import {Node, NodeType, Point} from "@alchemist-editor/core";
import {withRuleset} from "@treacherous/decorators";
import {ComponentData} from "../data/component-data";

export class ComponentNode extends Node<ComponentData>
{
    public static NodeType = new NodeType("ecsrx-component", "Component");

    @withRuleset(ComponentData)
    public data: ComponentData;

    constructor(data: ComponentData = new ComponentData(), position?: Point)
    {
        super(ComponentNode.NodeType, position);
        this.data = data;
    }
}
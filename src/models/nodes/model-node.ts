import {Node, NodeType, Point} from "@alchemist/core";
import {withRuleset} from "@treacherous/decorators";

import {ModelData} from "../data/model-data";

export class ModelNode extends Node<ModelData>
{
    public static NodeType = new NodeType("ecsrx-model", "Model");

    @withRuleset(ModelData)
    public data: ModelData;

    constructor(data = new ModelData(), position?: Point)
    {
        super(ModelNode.NodeType, position);
        this.data = data;
    }
}
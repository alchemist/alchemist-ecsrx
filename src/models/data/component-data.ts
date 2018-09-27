import {ReactivePropertyData} from "./reactive-property-data";
import {INodeData} from "@alchemist-editor/core";
import {required, withDisplayName, withRulesetForEach} from "@treacherous/decorators";

export class ComponentData implements INodeData
{
    @required()
    @withDisplayName("Component Name")
    public name: string;

    @withRulesetForEach(ReactivePropertyData)
    public properties: Array<ReactivePropertyData> = [];

    constructor(name = ""){
        this.name = name;
    }
}


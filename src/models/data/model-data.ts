import {INodeData} from "@alchemist/core";
import {PropertyData} from "@alchemist/dotnet";
import {required, withDisplayName, withRulesetForEach} from "@treacherous/decorators";
import {ReactivePropertyData} from "./reactive-property-data";

export class ModelData implements INodeData
{
    @required()
    @withDisplayName("Model Name")
    public name;

    @withRulesetForEach(PropertyData)
    public dependencies: Array<PropertyData> = [];

    @withRulesetForEach(ReactivePropertyData)
    public properties: Array<ReactivePropertyData> = [];

    constructor(name = ""){
        this.name = name;
    }
}


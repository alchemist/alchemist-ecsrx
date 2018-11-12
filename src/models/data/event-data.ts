import {INodeData} from "@alchemist/core";
import {PropertyData} from "@alchemist/dotnet";
import {required, withDisplayName} from "@treacherous/decorators";

export class EventData implements INodeData
{
    @required()
    @withDisplayName("Event Name")
    public name: string;

    public properties: Array<PropertyData> = [];

    constructor(name = ""){
        this.name = name;
    }
}


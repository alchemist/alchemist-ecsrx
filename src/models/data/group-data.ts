import {INodeData} from "@alchemist-editor/core";
import {ITypeData} from "@alchemist-editor/dotnet";
import {required, withDisplayName} from "@treacherous/decorators";

export class GroupData implements INodeData
{
    @required()
    @withDisplayName("Group Name")
    public name: string;
    
    public requiredComponents: Array<ITypeData> = [];
    public excludedComponents: Array<ITypeData> = [];

    constructor(name = "", requiredComponents: Array<ITypeData> = [], excludedComponents: Array<ITypeData> = []){
        this.name = name;
        this.requiredComponents = requiredComponents;
        this.excludedComponents = excludedComponents;
    }
}
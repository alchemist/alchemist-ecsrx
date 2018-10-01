import {INodeData} from "@alchemist-editor/core";
import {ITypeData, PropertyData} from "@alchemist-editor/dotnet";
import {required, withDisplayName, minLength} from "@treacherous/decorators";

import {emptyGroupType} from "@/types/ecsrx-types";
import {ReactivePropertyData} from "@/models/data/reactive-property-data";

export class ManualSystemData  implements INodeData
{
    @required()
    @withDisplayName("System Name")
    public name: string;

    public dependencies: Array<PropertyData> = [];
    public properties: Array<ReactivePropertyData> = [];

    public group: ITypeData = emptyGroupType;

    constructor(name = ""){
        this.name = name;
    }
}
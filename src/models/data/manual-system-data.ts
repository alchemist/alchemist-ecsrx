import {INodeData} from "@alchemist/core";
import {ITypeData, PropertyData} from "@alchemist/dotnet";
import {required, withDisplayName} from "@treacherous/decorators";

import {emptyGroupType} from "../../types/ecsrx-types";
import {ReactivePropertyData} from "./reactive-property-data";

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
import {INodeData} from "@alchemist/core";
import {ITypeData, PropertyData, commonTypes} from "@alchemist/dotnet";
import {required, withDisplayName, minLength} from "@treacherous/decorators";
import {emptyGroupType} from "../../types/ecsrx-types";
import {ReactivePropertyData} from "./reactive-property-data";

export class ConventionSystemData  implements INodeData
{
    @required()
    @withDisplayName("System Name")
    public name: string;

    public dependencies: Array<PropertyData> = [];
    public properties: Array<ReactivePropertyData> = [];

    @required()
    @minLength(1)
    public implementsSystems: Array<ITypeData> = [];

    public genericDataType: ITypeData = commonTypes.int;

    public group: ITypeData = emptyGroupType;

    constructor(name = ""){
        this.name = name;
    }
}
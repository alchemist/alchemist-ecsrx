import {INodeData} from "@alchemist-editor/core";
import {ITypeData, PropertyData, TypeData} from "@alchemist-editor/dotnet";

export class ReactivePropertyData extends PropertyData {

    constructor(name = "", type = new TypeData(), isCollection = false, public isReactive = false) {
        super(name, type, isCollection);
    }
}
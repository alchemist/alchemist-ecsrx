import {PropertyData, TypeData} from "@alchemist/dotnet";

export class ReactivePropertyData extends PropertyData {

    constructor(name = "", type = new TypeData(), isCollection = false, public isReactive = false) {
        super(name, type, isCollection);
    }
}
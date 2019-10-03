import {ITypeData} from "@alchemist/dotnet";

export const containsType = (types: Array<ITypeData>, type: ITypeData) => {
    return types.some(x => x.name == type.name && x.namespace == type.namespace);
};
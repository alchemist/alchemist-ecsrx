import {addUsings, PropertyData} from "@alchemist-editor/dotnet";

export const getAllUsingsFromProperties = (properties: Array<PropertyData>) => {
    const usings: Array<string> = [];
    properties.forEach(property => {
        addUsings(usings, property.type.namespace);
    });
    return usings;
};
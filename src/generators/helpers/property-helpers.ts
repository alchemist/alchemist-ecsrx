import {PropertyData} from "@alchemist/dotnet";

export const shouldHaveSetter = (property: PropertyData) => {
    return !property.isCollection;
};

export const generateProperty = (property: PropertyData) => {
    const addSetter = shouldHaveSetter(property);
    const propertyAccessor = `{ get; ${addSetter ? "set;" : ""} }`;

    let propertyType = property.type.name;
    if(property.isCollection)
    { propertyType = `IList<${property.type.name}>`; }

    return `public ${propertyType} ${property.name} ${propertyAccessor}`;
};

export const generateDependency = (property: PropertyData) => {
    const propertyAccessor = `{ get; }`;

    let propertyType = property.type.name;
    if(property.isCollection)
    { propertyType = `IList<${property.type.name}>`; }

    return `public ${propertyType} ${property.name} ${propertyAccessor}`;
};

export const generateInitializer = (property: PropertyData) => {
    let propertyType = property.type.name;
    if(property.isCollection)
    { propertyType = `List<${property.type.name}>`; }

    return `${property.name} = new ${propertyType}();`
};

export const getArgNameFor = (property: PropertyData) => {
    let sanitisedPropertyName = property.name;
    if (sanitisedPropertyName.startsWith("_"))
    { return sanitisedPropertyName.replace("_", ""); }

    return sanitisedPropertyName;
}

export const generateArg = (property: PropertyData) => {
    let propertyType = property.type.name;
    if(property.isCollection)
    { propertyType = `IList<${property.type.name}>`; }

    const argName = getArgNameFor(property);
    return `${propertyType} ${argName}`;
}

export const generateDependencyArgs = (dependencies: Array<PropertyData>): string => {
    return dependencies.map(generateArg).join(", ");
}

export const assignDependencyFromArgs = (property: PropertyData): string => {
    const argName = getArgNameFor(property);
    return `this.${property.name} = ${argName};`;
}
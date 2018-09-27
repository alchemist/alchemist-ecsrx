import {ReactivePropertyData} from "@/models/data/reactive-property-data";

export const shouldReactiveHaveSetter = (property: ReactivePropertyData) => {
    return !property.isReactive && !property.isCollection;
};

export const generateReactiveProperty = (property: ReactivePropertyData) => {
    const addSetter = shouldReactiveHaveSetter(property);
    const propertyAccessor = `{ get; ${addSetter ? "set;" : ""} }`;

    let propertyType = property.type.name;
    if(property.isReactive && property.isCollection)
    { propertyType = `IReactiveCollection<${property.type.name}>`; }
    else if(property.isReactive)
    { propertyType = `IReactiveProperty<${property.type.name}>`; }
    else if(property.isCollection)
    { propertyType = `IList<${property.type.name}>`; }

    return `public ${propertyType} ${property.name} ${propertyAccessor}`;
};

export const generateReactiveInitializer = (property: ReactivePropertyData) => {
    let propertyType = property.type.name;
    if(property.isReactive && property.isCollection)
    { propertyType = `ReactiveCollection<${property.type.name}>`; }
    else if(property.isReactive)
    { propertyType = `ReactiveProperty<${property.type.name}>`; }
    else if(property.isCollection)
    { propertyType = `List<${property.type.name}>`; }

    return `${property.name} = new ${propertyType}();`
};
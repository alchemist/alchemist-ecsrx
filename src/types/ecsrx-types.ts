import {TypeData, TypeDataWithImplementation} from "@alchemist-editor/dotnet";

export const ecsrxDefaultTypes = {
    eventSystem: new TypeData("EventSystem", "EcsRx.Events"),
    entityCollectionManager: new TypeData("EntityCollectionManager", "EcsRx.Collections"),
    entityCollection: new TypeData("EntityCollection", "EcsRx.Collections"),
    entityCollectionFactory : new TypeData("DefaultEntityCollectionFactory", "EcsRx.Collections"),
    entityFactory : new TypeData("DefaultEntityFactory", "EcsRx.Entities"),
    entity: new TypeData("Entity", "EcsRx.Entities")
};

export const ecsrxInterfaceTypes = {
    iEventSystem: new TypeDataWithImplementation("IEventSystem", "EcsRx.Events", ecsrxDefaultTypes.eventSystem),
    iEntityCollectionManager: new TypeDataWithImplementation("IEntityCollectionManager", "EcsRx.Collections", ecsrxDefaultTypes.entityCollectionManager),
    iEntityCollection: new TypeDataWithImplementation("IEntityCollection", "EcsRx.Collections", ecsrxDefaultTypes.entityCollection),
    iEntityCollectionFactory : new TypeDataWithImplementation("IEntityCollectionFactory", "EcsRx.Collections", ecsrxDefaultTypes.entityCollectionFactory),
    iEntityFactory : new TypeDataWithImplementation("IEntityFactory", "EcsRx.Entities", ecsrxDefaultTypes.entityFactory),
    iEntity: new TypeDataWithImplementation("IEntity", "EcsRx.Entities", ecsrxDefaultTypes.entity)
};

export const ecsrxSystemInterfaceTypes = {
    iReactToEntitySystem: new TypeData("IReactToEntitySystem", "EcsRx.Systems"),
    iReactToGroupSystem: new TypeData("IReactToGroupSystem", "EcsRx.Systems"),
    iReactToDataSystem: new TypeData("IReactToDataSystem", "EcsRx.Systems"),
    iSetupSystem: new TypeData("ISetupSystem", "EcsRx.Systems"),
    iTeardownSystem: new TypeData("ITeardownSystem", "EcsRx.Systems")
};

export const emptyGroupType = new TypeData("EmptyGroup", "EcsRx.Groups");
export const ecsrxInterfaceTypeList = Object.values(ecsrxInterfaceTypes);
export const ecsrxDefaultTypeList = Object.values(ecsrxDefaultTypes);
export const ecsrxSystemInterfaceTypeList = Object.values(ecsrxSystemInterfaceTypes);
import {TypeData} from "@alchemist-editor/dotnet";
import {ComponentNode} from "../../models/nodes/component-node";
import {GroupNode} from "../../models/nodes/group-node";
import {ModelNode} from "../../models/nodes/model-node";
import {EventNode} from "../../models/nodes/event-node";

export class EcsRxGetters
{
    public componentTypes = (state: any, getters: any, rootState: any, rootGetters: any): Array<TypeData> =>
    {
        if(rootState.project.activeProject == null) { return []; }

        return rootGetters.allProjectTypes.filter((x: TypeData) => x.metadata["nodeType"] == ComponentNode.NodeType.id);
    };

    public modelTypes = (state: any, getters: any, rootState: any, rootGetters: any): Array<TypeData> =>
    {
        if(rootState.project.activeProject == null) { return []; }

        return rootGetters.allProjectTypes.filter((x: TypeData) => x.metadata["nodeType"] == ModelNode.NodeType.id);
    };

    public eventTypes = (state: any, getters: any, rootState: any, rootGetters: any): Array<TypeData> =>
    {
        if(rootState.project.activeProject == null) { return []; }

        return rootGetters.allProjectTypes.filter((x: TypeData) => x.metadata["nodeType"] == EventNode.NodeType.id);
    };

    public groupTypes = (state: any, getters: any, rootState: any, rootGetters: any): Array<TypeData> =>
    {
        if(rootState.project.activeProject == null) { return []; }

        return rootGetters.allProjectTypes.filter((x: TypeData) => x.metadata["nodeType"] == GroupNode.NodeType.id);
    };
}
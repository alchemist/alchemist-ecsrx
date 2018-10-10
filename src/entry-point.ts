import {
    ComponentNodeComponent, ModelNodeComponent, GroupNodeComponent,
    EventNodeComponent, ManualSystemNodeComponent, ConventionSystemNodeComponent
} from "./component.exports"

import {ComponentGenerator} from "./generators/component.generator";
import {ModelGenerator} from "./generators/model.generator";
import {GroupGenerator} from "@/generators/group.generator";
import {EventGenerator} from "@/generators/event.generator";

import {NodeEntry, NodeRegistry, NodeGeneratorRegistry} from "@alchemist-editor/core";

import {ComponentNode} from "./models/nodes/component-node";
import {ModelNode} from "./models/nodes/model-node";
import {GroupNode} from "./models/nodes/group-node";
import {EcsRxGetters} from "@/stores/modules/ecsrx-getters";
import {EventNode} from "@/models/nodes/event-node";
import {ManualSystemNode} from "@/models/nodes/manual-system-node";
import {ManualSystemCoreGenerator} from "@/generators/manual-system.core.generator";
import {ManualSystemExtendGenerator} from "@/generators/manual-system.extend.generator";
import {EcsrxNodeFactory} from "@/factory/ecsrx-node-factory";
import {ConventionSystemNode} from "@/models/nodes/convention-system-node";
import {ConventionSystemCoreGenerator} from "@/generators/convention-system.core.generator";
import {ConventionSystemExtendGenerator} from "@/generators/convention-system.extend.generator";

import "@/styles/theme.ext.scss";

export function setup(nodeRegistry: NodeRegistry, generatorRegistry: NodeGeneratorRegistry, stores: any): Promise<any> {
    generatorRegistry.addGenerator(new ComponentGenerator());
    generatorRegistry.addGenerator(new ModelGenerator());
    generatorRegistry.addGenerator(new GroupGenerator());
    generatorRegistry.addGenerator(new EventGenerator());
    generatorRegistry.addGenerator(new ManualSystemCoreGenerator());
    generatorRegistry.addGenerator(new ManualSystemExtendGenerator());
    generatorRegistry.addGenerator(new ConventionSystemCoreGenerator());
    generatorRegistry.addGenerator(new ConventionSystemExtendGenerator());

    const ecsRxCategory = "EcsRx";
    const ecsRxSystemsCategory = "EcsRx - Systems";
    const ecsRxFactory = new EcsrxNodeFactory();

    nodeRegistry.addNode(new NodeEntry(ComponentNode.NodeType.id, ComponentNodeComponent, ecsRxFactory, ecsRxCategory, "Component"));
    nodeRegistry.addNode(new NodeEntry(ModelNode.NodeType.id, ModelNodeComponent, ecsRxFactory, ecsRxCategory, "Model"));
    nodeRegistry.addNode(new NodeEntry(GroupNode.NodeType.id, GroupNodeComponent, ecsRxFactory, ecsRxCategory, "Group"));
    nodeRegistry.addNode(new NodeEntry(EventNode.NodeType.id, EventNodeComponent, ecsRxFactory, ecsRxCategory, "Event"));
    nodeRegistry.addNode(new NodeEntry(ManualSystemNode.NodeType.id, ManualSystemNodeComponent, ecsRxFactory, ecsRxSystemsCategory, "Manual System"));
    nodeRegistry.addNode(new NodeEntry(ConventionSystemNode.NodeType.id, ConventionSystemNodeComponent, ecsRxFactory, ecsRxSystemsCategory, "Convention System"));

    const ecsrxModule = {
        getters: new EcsRxGetters()
    };
    stores.registerModule("ecsrx", ecsrxModule);

    console.log("Loaded Plugin: EcsRx");
    return Promise.resolve();
}
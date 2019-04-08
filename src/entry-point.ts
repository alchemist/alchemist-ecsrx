import {
    ComponentNodeComponent, ModelNodeComponent, GroupNodeComponent,
    EventNodeComponent, ManualSystemNodeComponent, ConventionSystemNodeComponent
} from "./component.exports"

import {ComponentGenerator} from "./generators/component.generator";
import {ModelGenerator} from "./generators/model.generator";
import {GroupGenerator} from "./generators/group.generator";
import {EventGenerator} from "./generators/event.generator";

import {NodeEntry, NodeRegistry, ProjectEntry, ProjectRegistry, NodeGeneratorRegistry} from "@alchemist/core";

import {ComponentNode} from "./models/nodes/component-node";
import {ModelNode} from "./models/nodes/model-node";
import {GroupNode} from "./models/nodes/group-node";
import {EcsRxGetters} from "./stores/modules/ecsrx-getters";
import {EventNode} from "./models/nodes/event-node";
import {ManualSystemNode} from "./models/nodes/manual-system-node";
import {ManualSystemCoreGenerator} from "./generators/manual-system.core.generator";
import {ManualSystemExtendGenerator} from "./generators/manual-system.extend.generator";
import {EcsrxNodeFactory} from "./factory/ecsrx-node-factory";
import {ConventionSystemNode} from "./models/nodes/convention-system-node";
import {ConventionSystemCoreGenerator} from "./generators/convention-system.core.generator";
import {ConventionSystemExtendGenerator} from "./generators/convention-system.extend.generator";

import {EcsRxProjectGenerator} from "./generators/projects/ecsrx-project-generator";

import {EcsrxClassLibraryProjectDescriptor} from "./models/project/ecsrx-class-library-project-descriptor";
import {EcsrxProjectFactory} from "./factory/ecsrx-project-factory";
import {IPlugin, DefaultOrdering, PluginContext} from "@alchemist/core";

import "./styles/theme.ext.scss";


export class Plugin implements IPlugin
{
    public name = "alchemist-ecsrx";
    public version = "0.3.0";
    public order = DefaultOrdering;

    public setup(pluginContext: PluginContext): Promise<any>
    {
        pluginContext.nodeGeneratorRegistry.addGenerator(new ComponentGenerator());
        pluginContext.nodeGeneratorRegistry.addGenerator(new ModelGenerator());
        pluginContext.nodeGeneratorRegistry.addGenerator(new GroupGenerator());
        pluginContext.nodeGeneratorRegistry.addGenerator(new EventGenerator());
        pluginContext.nodeGeneratorRegistry.addGenerator(new ManualSystemCoreGenerator());
        pluginContext.nodeGeneratorRegistry.addGenerator(new ManualSystemExtendGenerator());
        pluginContext.nodeGeneratorRegistry.addGenerator(new ConventionSystemCoreGenerator());
        pluginContext.nodeGeneratorRegistry.addGenerator(new ConventionSystemExtendGenerator());

        const ecsRxCategory = "EcsRx";
        const ecsRxSystemsCategory = "EcsRx - Systems";
        const ecsRxFactory = new EcsrxNodeFactory();

        pluginContext.nodeRegistry.addNode(new NodeEntry(ComponentNode.NodeType.id, ComponentNodeComponent, ecsRxFactory, ecsRxCategory, "Component"));
        pluginContext.nodeRegistry.addNode(new NodeEntry(ModelNode.NodeType.id, ModelNodeComponent, ecsRxFactory, ecsRxCategory, "Model"));
        pluginContext.nodeRegistry.addNode(new NodeEntry(GroupNode.NodeType.id, GroupNodeComponent, ecsRxFactory, ecsRxCategory, "Group"));
        pluginContext.nodeRegistry.addNode(new NodeEntry(EventNode.NodeType.id, EventNodeComponent, ecsRxFactory, ecsRxCategory, "Event"));
        pluginContext.nodeRegistry.addNode(new NodeEntry(ManualSystemNode.NodeType.id, ManualSystemNodeComponent, ecsRxFactory, ecsRxSystemsCategory, "Manual System"));
        pluginContext.nodeRegistry.addNode(new NodeEntry(ConventionSystemNode.NodeType.id, ConventionSystemNodeComponent, ecsRxFactory, ecsRxSystemsCategory, "Convention System"));

        pluginContext.projectRegistry.addProject(new ProjectEntry(new EcsrxClassLibraryProjectDescriptor(), new EcsrxProjectFactory()));
        pluginContext.projectGeneratorRegistry.addGenerator(new EcsRxProjectGenerator());

        const ecsrxModule = {
            getters: new EcsRxGetters()
        };

        pluginContext.store.registerModule("ecsrx", ecsrxModule);

        console.log("Loaded Plugin: EcsRx");
        return Promise.resolve();
    }
}


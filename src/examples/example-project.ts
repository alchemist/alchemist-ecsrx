import { ComponentData } from "@/models/data/component-data";
import { ComponentNode } from "@/models/nodes/component-node";
import { ConventionSystemData } from "@/models/data/convention-system-data";
import { ConventionSystemNode } from "@/models/nodes/convention-system-node";
import { EcsRxProject } from "@/models/project/ecsrx-project";
import { EventData } from "@/models/data/event-data";
import { EventNode } from "@/models/nodes/event-node";
import { GroupData } from "@/models/data/group-data";
import { GroupNode } from "@/models/nodes/group-node";
import { ManualSystemData } from "@/models/data/manual-system-data";
import { ManualSystemNode } from "@/models/nodes/manual-system-node";
import { ModelData } from "@/models/data/model-data";
import { ModelNode } from "@/models/nodes/model-node";
import { ReactivePropertyData } from "@/models/data/reactive-property-data";

import {NamespaceNodeGroup, commonTypes} from "@alchemist-editor/dotnet";
import {WorkspaceConfig, Point} from "@alchemist-editor/core";

const exampleComponent = new ComponentData();
exampleComponent.name = "ExampleComponent";

const normalProperty = new ReactivePropertyData("SimpleType", commonTypes.int);
exampleComponent.properties.push(normalProperty);

const reactiveProperty = new ReactivePropertyData("ReactiveType", commonTypes.float, false, true);
exampleComponent.properties.push(reactiveProperty);

const collectionProperty = new ReactivePropertyData("CollectionType", commonTypes.string, true);
exampleComponent.properties.push(collectionProperty);

const examplesNamespace = new NamespaceNodeGroup(false, "Root", new WorkspaceConfig(),[
    new ComponentNode(exampleComponent, new Point(5000,5000)),
    new ModelNode(new ModelData("ExampleModel"), new Point(5500, 5000)),
    new GroupNode(new GroupData("TestGroup"), new Point(6000, 5000)),
    new EventNode(new EventData("SomeExampleEvent"), new Point(5000, 5500)),
    new ManualSystemNode(new ManualSystemData("SomeDummySystem"), new Point(5000, 6000)),
    new ConventionSystemNode(new ConventionSystemData("SomeConventionSystem"), new Point(5500,5500))
]);

export const exampleProject = new EcsRxProject("Example Project");
exampleProject.nodeGroups.push(examplesNamespace);
exampleProject.nodeGroups.push(new NamespaceNodeGroup(true, "AnotherExample"));
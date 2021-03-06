import { ComponentData } from "../models/data/component-data";
import { ComponentNode } from "../models/nodes/component-node";
import { ReactiveSystemData } from "../models/data/reactive-system-data";
import { ReactiveSystemNode } from "../models/nodes/reactive-system-node";
import { EcsRxProject } from "../models/project/ecsrx-project";
import { EventData } from "../models/data/event-data";
import { EventNode } from "../models/nodes/event-node";
import { GroupData } from "../models/data/group-data";
import { GroupNode } from "../models/nodes/group-node";
import { ManualSystemData } from "../models/data/manual-system-data";
import { ManualSystemNode } from "../models/nodes/manual-system-node";
import { ModelData } from "../models/data/model-data";
import { ModelNode } from "../models/nodes/model-node";
import { ReactivePropertyData } from "../models/data/reactive-property-data";
import {ecsrxReactiveSystemInterfaceTypes} from "../types/ecsrx-types";
import {EcsrxClassLibraryProjectDescriptor} from "../models/project/ecsrx-class-library-project-descriptor";

import {NamespaceNodeGroup, commonTypes} from "@alchemist/dotnet";
import {WorkspaceConfig, Point, IProject} from "@alchemist/core";

const exampleComponent = new ComponentData();
exampleComponent.name = "ExampleComponent";

const normalProperty = new ReactivePropertyData("SimpleType", commonTypes.int);
exampleComponent.properties.push(normalProperty);

const reactiveProperty = new ReactivePropertyData("ReactiveType", commonTypes.float, false, true);
exampleComponent.properties.push(reactiveProperty);

const collectionProperty = new ReactivePropertyData("CollectionType", commonTypes.string, true);
exampleComponent.properties.push(collectionProperty);

const reactiveSystemData = new ReactiveSystemData("SomeReactiveSystem");
reactiveSystemData.implementsSystems.push(ecsrxReactiveSystemInterfaceTypes.iReactToGroupSystem);

export function createExampleProject(projectName: string, outputDirectory: string) : IProject
{
    const exampleProject = new EcsRxProject(projectName, outputDirectory);
    const examplesNamespace = new NamespaceNodeGroup(false, projectName, new WorkspaceConfig(),[
        new ComponentNode(exampleComponent, new Point(5000,5000)),
        new ModelNode(new ModelData("ExampleModel"), new Point(5500, 5000)),
        new GroupNode(new GroupData("TestGroup"), new Point(6000, 5000)),
        new EventNode(new EventData("SomeExampleEvent"), new Point(5000, 5500)),
        new ManualSystemNode(new ManualSystemData("SomeDummySystem"), new Point(5000, 6000)),
        new ReactiveSystemNode(reactiveSystemData, new Point(5500,5500))
    ]);

    exampleProject.nodeGroups.push(examplesNamespace);

    return exampleProject;
}
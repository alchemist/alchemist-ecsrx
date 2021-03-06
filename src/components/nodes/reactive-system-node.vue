<template>
    <node-container :node="node" :position.sync="node.position">
        <template slot="header">
            <div class="system-name-container control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="System Name" v-model="node.data.name" v-show-error validate-property="node.data.name">
                <span class="icon is-left">
                    <i class="fas fa-edit"></i>
                </span>
            </div>
        </template>
        <template slot="content">
            <systems-section :implementations="node.data.implementsSystems" @model-state-changed="refreshValidation"></systems-section>
            <type-section title="Generic Type" :allowedTypes="allowedGenericTypes" :type.sync="node.data.genericDataType" @model-state-changed="refreshValidation"></type-section>
            <type-section title="Group Type" :allowedTypes="allowedGroupTypes" :type.sync="node.data.group" @model-state-changed="refreshValidation"></type-section>
            <properties-section :properties="node.data.dependencies" propertiesName="Dependencies" :typesToShow="allowedDependencyTypes" @model-state-changed="refreshValidation"></properties-section>
            <reactive-properties-section :properties="node.data.properties" :typesToShow="allowedPropertyTypes" @model-state-changed="refreshValidation"></reactive-properties-section>
        </template>
    </node-container>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from "vue-property-decorator";
    import {Getter} from "vuex-class";

    import {NodeContainerComponent as NodeContainer, ValidateNode} from "@alchemist/core";
    import {ITypesToShow, ITypeData, commonTypeList, PropertiesSectionComponent as PropertiesSection, TypeSectionComponent as TypeSection } from "@alchemist/dotnet";

    import {default as ReactivePropertiesSection} from "../reactive-properties-section.vue";
    import {unityCommonTypeList, unityGameTypeList} from "../../types/unity-common-types";
    import {ecsrxInterfaceTypeList, emptyGroupType} from "../../types/ecsrx-types";
    import {ReactiveSystemNode} from "../../models/nodes/reactive-system-node";
    import {default as SystemsSection} from "../systems-section.vue";

    @Component({
        components: {
            SystemsSection,
            PropertiesSection,
            ReactivePropertiesSection,
            TypeSection,
            NodeContainer
        },
        mixins: [ ValidateNode(ReactiveSystemNode) ]
    })
    export default class extends Vue
    {
        @Prop()
        public node: ReactiveSystemNode;

        @Getter("ecsrx/modelTypes")
        public modelTypes: Array<ITypeData>;

        @Getter("ecsrx/eventTypes")
        public eventTypes: Array<ITypeData>;

        @Getter("ecsrx/groupTypes")
        public projectGroupTypes: Array<ITypeData>;

        public get allowedGroupTypes(): ITypesToShow {
            return {
                "Default Groups": [emptyGroupType],
                "Project Groups": this.projectGroupTypes
            };
        }

        public allowedDependencyTypes: ITypesToShow = {
            "Common": commonTypeList,
            "Unity": unityCommonTypeList
        };

        public get allowedPropertyTypes(): ITypesToShow {
            return {
                "Common": commonTypeList,
                "Unity": unityCommonTypeList,
                "Unity Game": unityGameTypeList,
                "EcsRx": ecsrxInterfaceTypeList,
                "Models": this.modelTypes,
            };
        }

        public get allowedGenericTypes(): ITypesToShow
        {
            return {
                "Common": commonTypeList,
                "Unity": unityCommonTypeList,
                "Unity Game": unityGameTypeList,
                "Models": this.modelTypes,
                "Events": this.eventTypes
            };
        }

        public onStateChanged()
        { this["refreshValidation"](); }
    }
</script>

<style lang="scss">
    @import "~@alchemist/core/src/styles/helpers";
    @import "../../styles/variables";

    [node-type="ecsrx-reactive-system"] .node-header
    {
        @include auto-gradient($conventional-system-node-color);
    }

    .system-name-container
    {
        width: 21em;
    }
</style>
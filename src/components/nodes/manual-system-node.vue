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
            <type-section title="Group Type" :allowedTypes="allowedGroupTypes" :type.sync="node.data.group" @model-state-changed="refreshValidation"></type-section>
            <properties-section :properties="node.data.dependencies" propertiesName="Dependencies" :typesToShow="allowedDependencyTypes" @model-state-changed="refreshValidation"></properties-section>
            <reactive-properties-section :properties="node.data.properties" :typesToShow="allowedPropertyTypes" @model-state-changed="refreshValidation"></reactive-properties-section>
        </template>
    </node-container>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from "vue-property-decorator";

    import {NodeContainerComponent as NodeContainer, ValidateNode} from "@alchemist/core";
    import {ITypesToShow, ITypeData, commonTypeList, PropertiesSectionComponent as PropertiesSection, TypeSectionComponent as TypeSection} from "@alchemist/dotnet";

    import {default as ReactivePropertiesSection} from "../reactive-properties-section.vue";
    import {unityCommonTypeList, unityGameTypeList} from "../../types/unity-common-types";
    import {ecsrxInterfaceTypeList, emptyGroupType} from "../../types/ecsrx-types";

    import {ManualSystemNode} from "../../models/nodes/manual-system-node";
    import {Getter} from "vuex-class";

    @Component({
        components: {
            TypeSection,
            PropertiesSection,
            ReactivePropertiesSection,
            NodeContainer
        },
        mixins: [ ValidateNode(ManualSystemNode) ]
    })
    export default class extends Vue
    {
        @Prop()
        public node: ManualSystemNode;

        @Getter("ecsrx/modelTypes")
        public modelTypes: Array<ITypeData>;

        @Getter("ecsrx/groupTypes")
        public projectGroupTypes: Array<ITypeData>;

        public get allowedGroupTypes(): ITypesToShow {
            return {
                "Default Groups": [emptyGroupType],
                "Project Groups": this.projectGroupTypes || []
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
                "Models": this.modelTypes || [],
            };
        }
    }
</script>

<style lang="scss">
    @import "~@alchemist/core/src/styles/helpers";
    @import "../../styles/variables";

    [node-type="ecsrx-manual-system"] .node-header
    {
        @include auto-gradient($manual-system-node-color);
    }

    .system-name-container
    {
        width: 21em;
    }
</style>
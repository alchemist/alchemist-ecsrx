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
            <group-section :group.sync="node.data.group"></group-section>
            <properties-section :properties="node.data.dependencies" propertiesName="Dependencies" :typesToShow="allowedDependencyTypes"></properties-section>
            <reactive-properties-section :properties="node.data.properties" :typesToShow="allowedPropertyTypes"></reactive-properties-section>
        </template>
    </node-container>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from "vue-property-decorator";

    import {NodeContainerComponent as NodeContainer, ValidateNode} from "@alchemist-editor/core";
    import {ITypesToShow, ITypeData, commonTypeList, PropertiesSectionComponent as PropertiesSection} from "@alchemist-editor/dotnet";

    import {default as ReactivePropertiesSection} from "../reactive-properties-section.vue";
    import {default as GroupSection} from "../group-section.vue";
    import {unityCommonTypeList, unityGameTypeList} from "../../types/unity-common-types";
    import {ecsrxInterfaceTypeList} from "../../types/ecsrx-types";

    import {ManualSystemNode} from "../../models/nodes/manual-system-node";
    import {Getter} from "vuex-class";

    @Component({
        components: {
            GroupSection,
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

        @Getter("modelTypes")
        public modelTypes: Array<ITypeData>;

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
    }
</script>

<style lang="scss">
    @import "~@alchemist-editor/core/src/styles/helpers";
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
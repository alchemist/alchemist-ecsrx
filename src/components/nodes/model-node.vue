<template>
    <node-container :node="node" :position.sync="node.position">
        <template slot="header">
            <div class="model-name-container control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Model Name" v-model="node.data.name" v-show-error validate-property="node.data.name">
                <span class="icon is-left">
                    <i class="fas fa-edit"></i>
                </span>
            </div>
        </template>
        <template slot="content">
            <properties-section :properties="node.data.dependencies" :propertiesName="'Dependencies'" :typesToShow="allowedDependencyTypes"></properties-section>
            <reactive-properties-section :properties="node.data.properties" :typesToShow="allowedPropertyTypes"></reactive-properties-section>
        </template>
    </node-container>
</template>

<script lang="ts">
    import {ModelNode} from "../../models/nodes/model-node";
    import {Getter} from "vuex-class";
    import {Prop, Component, Vue} from "vue-property-decorator";

    import {NodeContainerComponent as NodeContainer, ValidateNode} from "@alchemist-editor/core";
    import {ITypesToShow, ITypeData, commonTypeList, PropertiesSectionComponent as PropertiesSection} from "@alchemist-editor/dotnet";

    import {default as ReactivePropertiesSection} from "../reactive-properties-section.vue";
    import {unityCommonTypeList} from "../../types/unity-common-types";
    import {ecsrxInterfaceTypeList} from "../../types/ecsrx-types";


    @Component({
        components: {
            NodeContainer,
            ReactivePropertiesSection,
            PropertiesSection
        },
        mixins: [ ValidateNode(ModelNode) ]
    })
    export default class extends Vue
    {
        @Prop()
        public node: ModelNode;

        @Getter("modelTypes")
        public modelTypes: Array<ITypeData>;

        public get allowedDependencyTypes(): ITypesToShow
        {
            return {
                "EcsRx": ecsrxInterfaceTypeList,
                "Models": this.modelTypes
            }
        };

        public allowedPropertyTypes: ITypesToShow = {
            "Common": commonTypeList,
            "Unity": unityCommonTypeList,
            "EcsRx": ecsrxInterfaceTypeList
        }
    }
</script>

<style lang="scss">
    @import "~@alchemist-editor/core/src/styles/helpers";
    @import "../../styles/variables";

    [node-type="ecsrx-model"] .node-header
    {
        @include auto-gradient($model-node-color);
    }

    .model-name-container
    {
        width: 21em;
    }
</style>
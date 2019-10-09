<template>
    <node-container :node="node" :position.sync="node.position">
        <template slot="header">
            <div class="component-name-container control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Component Name" v-model="node.data.name" v-show-error validate-property="node.data.name">
                <span class="icon is-left">
                    <i class="fas fa-edit"></i>
                </span>
            </div>
        </template>
        <template slot="content">
            <reactive-properties-section :properties="node.data.properties" :typesToShow="allowedPropertyTypes" @model-state-changed="refreshValidation"></reactive-properties-section>
        </template>
    </node-container>
</template>

<script lang="ts">
    import {ComponentNode} from "../../models/nodes/component-node";
    import {Prop, Vue, Component} from "vue-property-decorator";

    import {NodeContainerComponent as NodeContainer, createNodeRuleset, ValidateNode} from "@alchemist/core";
    import {ITypesToShow, commonTypeList} from "@alchemist/dotnet";
    import {default as ReactivePropertiesSection} from "../reactive-properties-section.vue";
    import {unityCommonTypeList} from "../../types/unity-common-types";
    import {ecsrxInterfaceTypeList} from "../../types/ecsrx-types";

    @Component({
        components: {
            NodeContainer,
            ReactivePropertiesSection
        },
        mixins: [ ValidateNode(ComponentNode) ]
    })
    export default class extends Vue
    {
        @Prop()
        public node: ComponentNode;

        public allowedPropertyTypes: ITypesToShow = {
            "Common": commonTypeList,
            "Unity": unityCommonTypeList,
            "EcsRx": ecsrxInterfaceTypeList
        }
    }
</script>

<style lang="scss">
    @import "~@alchemist/core/src/styles/helpers";
    @import "../../styles/variables";

    [node-type="ecsrx-component"] .node-header
    {
        @include auto-gradient($component-node-color);
    }

    .component-name-container
    {
        width: 21em;
    }
</style>
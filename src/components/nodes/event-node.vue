<template>
    <node-container :node="node" :position.sync="node.position">
        <template slot="header">
            <div class="event-name-container control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Event Name" v-model="node.data.name" v-show-error validate-property="node.data.name">
                <span class="icon is-left">
                    <i class="fas fa-edit"></i>
                </span>
            </div>
        </template>
        <template slot="content">
            <properties-section :properties="node.data.properties" :typesToShow="allowedPropertyTypes"></properties-section>
        </template>
    </node-container>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from "vue-property-decorator";
    import {Getter, Mutation} from "vuex-class";

    import {NodeContainerComponent as NodeContainer, ValidateNode} from "@alchemist-editor/core";
    import {ITypesToShow, ITypeData, commonTypeList, PropertiesSectionComponent as PropertiesSection, createNodeRuleset} from "@alchemist-editor/dotnet";

    import {unityCommonTypeList} from "../../types/unity-common-types";
    import {EventNode} from "../../models/nodes/event-node";
    import {ecsrxInterfaceTypeList} from "../../types/ecsrx-types";

    @Component({
        components: {
            NodeContainer,
            PropertiesSection
        },
        mixins: [ ValidateNode(EventNode) ]
    })
    export default class extends Vue
    {
        @Prop()
        public node: EventNode;

        @Getter("modelTypes")
        public modelTypes: Array<ITypeData>;

        public get allowedPropertyTypes(): ITypesToShow {
            return {
                "Common": commonTypeList,
                "Unity": unityCommonTypeList,
                "EcsRx": ecsrxInterfaceTypeList,
                "Models": this.modelTypes,
            };
        }
    }
</script>

<style lang="scss">
    @import "~@alchemist-editor/core/src/styles/helpers";
    @import "../../styles/variables";

    [node-type="ecsrx-event"] .node-header
    {
        @include auto-gradient($event-node-color);
    }

    .event-name-container
    {
        width: 21em;
    }
</style>
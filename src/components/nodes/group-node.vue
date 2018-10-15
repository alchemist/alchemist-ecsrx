<template>
    <node-container :node="node" :position.sync="node.position">
        <template slot="header">
            <div class="group-name-container control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Group Name" v-model="node.data.name" v-show-error validate-property="node.data.name">
                <span class="icon is-left">
                    <i class="fas fa-edit"></i>
                </span>
            </div>
        </template>
        <template slot="content">
            <components-section title="Required Components" :components="node.data.requiredComponents"></components-section>
            <components-section title="Excluded Components" :components="node.data.excludedComponents"></components-section>
        </template>
    </node-container>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from "vue-property-decorator";

    import {NodeContainerComponent as NodeContainer, ValidateNode} from "@alchemist-editor/core";
    import {default as ComponentsSection} from "../components-section.vue";
    import {GroupNode} from "../../models/nodes/group-node";

    @Component({
        components: {
            NodeContainer,
            ComponentsSection
        },
        mixins: [ ValidateNode(GroupNode) ]
    })
    export default class extends Vue
    {
        @Prop()
        public node: GroupNode;
    }
</script>

<style lang="scss">
    @import "~@alchemist-editor/core/src/styles/helpers";
    @import "../../styles/variables";

    [node-type="ecsrx-group"] .node-header
    {
        @include auto-gradient($group-node-color);
    }

    .group-name-container
    {
        width: 21em;
    }
</style>
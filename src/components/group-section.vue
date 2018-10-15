<template>
    <div class="m-sm">
        <div>
            <div class="tags">
                <span class="tag">Group</span>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <type-picker class="m-sm" :type="group" :typeLists="allowedTypes" v-on:update:type="(newGroup) => this.$emit('update:group', newGroup)">
                    <template slot="control-trigger">
                        <button class="group-button type-button button" aria-haspopup="true" aria-controls="dropdown-menu2">
                            <span>{{group.name || "No Group Selected" | capitalize }}</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </template>
                </type-picker>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {TypePickerComponent as TypePicker, ITypesToShow, ITypeData} from "@alchemist-editor/dotnet";
    import {Getter} from "vuex-class";
    import {emptyGroupType} from "../types/ecsrx-types";

    @Component({
        components: {TypePicker}
    })
    export default class extends Vue
    {
        @Prop()
        public group: ITypeData;

        @Getter("groupTypes")
        public projectGroupTypes: Array<ITypeData>;

        public get allowedTypes(): ITypesToShow {
            return {
                "Default Groups": [emptyGroupType],
                "Project Groups": this.projectGroupTypes
            };
        }
    }
</script>

<style lang="scss" scoped>
    .property-name
    {
        width: 12em;
    }

    .dropdown
    {
        width: 100%;

        >div, .group-button
        { width: 100%; }
    }
</style>
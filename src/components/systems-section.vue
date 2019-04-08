<template>
    <div class="m-sm">
        <div>
            <div class="tags has-addons">
                <span class="tag">{{title || "System Conventions"}}</span>
                <a class="tag is-primary" @click="addImplementation()">Add</a>
            </div>
        </div>
        <div v-for="(implementation, index) in implementations">
            <div class="field has-addons">
                <div class="control">
                    <type-picker class="m-sm" :type="implementation" :typeLists="allowedTypes" v-on:update:type="(newType) => updateImplementation(index, newType)">
                        <template slot="control-trigger">
                            <button class="component-button type-button button" aria-haspopup="true" aria-controls="dropdown-menu2">
                                <span>{{implementation.name || "No Implementations Selected" | capitalize }}</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </template>
                    </type-picker>
                </div>
                <div class="control">
                    <a class="remove-implementation-button button is-danger" @click="removeImplementation(index)">
                        <span class="icon">
                          <i class="fas fa-times"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {TypePickerComponent as TypePicker, TypeData, ITypesToShow, ITypeData, unknownType} from "@alchemist/dotnet";
    import {ecsrxreactiveSystemInterfaceTypeList} from "../types/ecsrx-types";

    @Component({
        components: {TypePicker}
    })
    export default class extends Vue
    {
        @Prop()
        public implementations: Array<TypeData>;

        @Prop()
        public title: string;

        public addImplementation() {
            this.implementations.push(unknownType);
        }

        public updateImplementation(index: number, newType: ITypeData) {
            this.$set(this.implementations, index, newType);
        }

        public removeImplementation(index: number) {
            this.implementations.splice(index, 1);
        }

        public get allowedTypes(): ITypesToShow {
            const filteredConventions = ecsrxreactiveSystemInterfaceTypeList.filter(x => this.implementations.indexOf(x) < 0);
            return {
                "System Conventions": filteredConventions
            };
        }
    }
</script>

<style lang="scss" scoped>
    .property-name
    {
        width: 12em;
    }

    .remove-implementation-button
    {
        margin-left: -7px;
        margin-top: 8px;
    }

    .dropdown
    {
        width: 19em;
        display: block;

        >div, .component-button
        {
            width: 100%;

            span:first-child
            {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>
<template>
    <div class="m-sm">
        <div>
            <div class="tags has-addons">
                <span class="tag">{{title || "Components"}}</span>
                <a class="tag is-primary" @click="addComponent()">Add</a>
            </div>
        </div>
        <div v-for="(component, index) in components">
            <div class="field has-addons">
                <div class="control">
                    <type-picker class="m-sm" :type="component" :typeLists="allowedTypes" v-on:update:type="(newType) => updateComponent(index, newType)">
                        <template slot="control-trigger">
                            <button class="component-button type-button button" aria-haspopup="true" aria-controls="dropdown-menu2">
                                <span>{{component.name || "No Component Selected" | capitalize }}</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </template>
                    </type-picker>
                </div>
                <div class="control">
                    <a class="remove-component-button button is-danger" @click="removeComponent(index)">
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
    import {Getter} from "vuex-class";
    import {ITypeData, unknownType, ITypesToShow, TypeData, TypePickerComponent as TypePicker} from "@alchemist-editor/dotnet";

    @Component({
        components: {TypePicker}
    })
    export class ComponentsSectionComponent extends Vue
    {
        @Prop()
        public components: Array<TypeData>;

        @Prop()
        public title: string;

        @Getter("componentTypes")
        public projectComponentTypes: Array<ITypeData>;

        public addComponent() {
            this.components.push(unknownType);
        }

        public updateComponent(index: number, newType: ITypeData) {
            this.$set(this.components, index, newType);
        }

        public removeComponent(index: number) {
            this.components.splice(index, 1);
        }

        public get allowedTypes(): ITypesToShow {
            const filteredComponents = this.projectComponentTypes.filter(x => this.components.indexOf(x) < 0);
            return {
                "Components": filteredComponents
            };
        }
    }
</script>

<style lang="scss" scoped>
    .property-name
    {
        width: 12em;
    }

    .remove-component-button
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
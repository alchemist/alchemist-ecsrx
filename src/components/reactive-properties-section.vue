<template>
    <div class="property-section m-sm">
        <div>
            <div class="tags has-addons">
                <span class="tag header-tag">{{propertiesName}}</span>
                <a class="tag is-primary" @click="addProperty()">Add</a>
            </div>
        </div>
        <div v-for="(property, index) in properties">
            <div class="field has-addons m-sm">
                <div class="control">
                    <type-picker :type.sync="property.type" :typeLists="typesToShow" @model-state-changed="refreshValidation">
                        <template slot="custom-picker">
                            <div class="dropdown-item">
                                <p>Modifiers</p>
                                <label class="tag m-xxs checkbox">
                                    <input type="checkbox" v-model="property.isCollection">
                                    Is Collection
                                </label>
                                <label class="tag m-xxs checkbox">
                                    <input type="checkbox" v-model="property.isReactive">
                                    Is Reactive
                                </label>
                            </div>
                            <hr class="dropdown-divider">
                        </template>
                    </type-picker>
                </div>
                <div class="control">
                    <input class="property-name input" type="text" placeholder="Name" v-model="property.name" v-show-error :validate-property="`properties[${index}].name`">
                    <div>
                        <span class="tag" v-if="property.isCollection">Collection</span>
                        <span class="tag" v-if="property.isReactive">Reactive</span>
                    </div>
                </div>
                <div class="control">
                    <a class="button is-danger" @click="removeProperty(index)">
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
    import {ReactivePropertyData} from "../models/data/reactive-property-data";
    import {TypePickerComponent as TypePicker, ITypesToShow, commonTypeList, unknownType} from "@alchemist/dotnet";
    import {createRulesetFor} from "@treacherous/decorators";
    import {createRuleset} from "@treacherous/core";
    import {ValidateWith} from "@treacherous/vue";

    const propertyDataRuleset = createRulesetFor(ReactivePropertyData);
    const propertySectionRuleset = createRuleset()
        .forProperty("properties")
            .addRulesetForEach(propertyDataRuleset)
        .build();

    @Component({
        components: {TypePicker},
        mixins: [ ValidateWith(propertySectionRuleset, { validateProps: true, withReactiveValidation: true }) ]
    })
    export default class extends Vue
    {
        @Prop()
        public properties: ReactivePropertyData[];

        @Prop({ default: () => { return "Properties" }})
        public propertiesName: string;

        @Prop({ default: () => { return { "Common": commonTypeList } }})
        public typesToShow: ITypesToShow;

        public addProperty() {
            const propertyPlaceholder = new ReactivePropertyData("", unknownType);
            this.properties.push(propertyPlaceholder);
        }

        public removeProperty(index: number) {
            this.properties.splice(index, 1);
        }
    }
</script>

<style lang="scss" scoped>
    .property-name
    {
        width: 12em;
    }
</style>

<template>
    <b-collapse
        :id="parentCollapseId"
        >
        <b-card 
            :class="'border-0'"
            no-body>
                <b-list-group flush>
              
                    <b-list-group-item>
                    <b-row>
                        <b-col>
                            Start Array
                        </b-col> 
                        <b-col cols="3" class="text-left">{{ parentCollapseTitle }}</b-col>
                        <b-col>&nbsp;</b-col>          
                        <b-col>&nbsp;</b-col>
                        <b-col>&nbsp;</b-col>
                    </b-row>
                
    
                </b-list-group-item>

                <b-list-group-item
                        :class="'p-0'"
                        v-for="(subProps, index) in items"
                        :key="index"
                >
                    <b-row
                        :class="'py-2 pl-1'"
                    >
                        <b-col>
                            <toggle-button
                                :toggleTrigger="`collapse-trigger-1-${wordifyString(schemaTitle)}-${wordifyString(subProps.field)}-${index}`"
                                :toggleTarget="`collapse-1-${wordifyString(schemaTitle)}-${wordifyString(subProps.field)}-${index}`"
                            ></toggle-button>
                            Field
                        </b-col>
                        <b-col cols="3" class="pl-4 text-left">{{ subProps.field }}</b-col>
                        <b-col>&nbsp;</b-col>          
                        <b-col>&nbsp;</b-col>
                        <b-col>&nbsp;</b-col>
                    </b-row>
                
                    <b-row>
                        <b-col>
                            <b-collapse
                                :id="`collapse-1-${wordifyString(schemaTitle)}-${wordifyString(subProps.field)}-${index}`"
                            >
                                    <toggle-detail
                                        :items="[subProps]"
                                        :isSingleField="false"
                                    ></toggle-detail>
                            </b-collapse>
                        </b-col>
                    </b-row>

                </b-list-group-item>

                </b-list-group>
        </b-card>

    </b-collapse>

</template>




<!--
<template>
    <b-collapse
        :id="parentCollapseId"
        >
        <b-card 
            :class="'border-0'"
            no-body>
                <b-list-group flush>
              
                    <b-list-group-item>
                    <b-row>
                        <b-col>
                            Start Array
                        </b-col> 
                        <b-col cols="3" class="text-left">{{ parentCollapseTitle }}</b-col>
                        <b-col>&nbsp;</b-col>          
                        <b-col>&nbsp;</b-col>
                        <b-col>&nbsp;</b-col>
                    </b-row>
                
    
                </b-list-group-item>

                <b-list-group-item
                        :class="'p-0'"
                        v-for="subProps in items"
                        :key="subProps.index"
                >
                    <b-row
                        :class="'py-2 pl-1'"
                    >
                        <b-col>
                            <toggle-button
                                :toggleTrigger="`collapse-trigger-1-${wordifyString(schemaTitle)}-${wordifyString(subProps.field)}-${subProps.index}`"
                                :toggleTarget="`collapse-1-${wordifyString(schemaTitle)}-${wordifyString(subProps.field)}-${subProps.index}`"
                            ></toggle-button>
                            Field
                        </b-col>
                        <b-col cols="3" class="pl-4 text-left">{{ subProps.field }}</b-col>
                        <b-col>&nbsp;</b-col>          
                        <b-col>&nbsp;</b-col>
                        <b-col>&nbsp;</b-col>
                    </b-row>
                
                    <b-row>
                        <b-col>
                            <b-collapse
                                :id="`collapse-1-${wordifyString(schemaTitle)}-${wordifyString(subProps.field)}-${subProps.index}`"
                            >
                                    <toggle-detail
                                        :items="[subProps]"
                                        :isSingleField="false"
                                    ></toggle-detail>
                            </b-collapse>
                        </b-col>
                    </b-row>

                </b-list-group-item>

                </b-list-group>
        </b-card>

    </b-collapse>

</template>
-->

<script lang="ts">
    import Vue from 'vue'

    import { wordifyString } from '@/mixins/common.js'


    export default Vue.extend({

        name:"CollapseArrayType",

        props:{

            schemaTitle:{
                type: String,
                default: 'Token Template'
            },

            parentCollapseTitle:{
                type: String,
                default: 'Start Array List Name'
            },
            parentCollapseId:{ 
                type: String,
                default: 'parent-collapse-id'
            },

            items:{
                type: Array,
                default: () => {
                    return []
                }
            },
            isSingleField:{
                type: Boolean,
                default: true
            }
        },

        methods:{
            wordifyString(str: string): string{
                try {
                    return wordifyString(str);
                } catch(e) {
                    return 'NO_STRING_FOUND'
                }
            }
        }
    })
</script>
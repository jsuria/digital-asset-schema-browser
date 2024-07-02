<template>
    <!-- TOGGLE-ENUM -->
     <b-card 
        class="border-0"
        no-body>
        <b-list-group flush>      
            <b-list-group-item
                :class="'rounded-0'"
                style="background-color: #DDD1DC;">
                <b-row style="font-weight: 600">
                    <b-col>Enum</b-col>          
                    <b-col :class="'pl-0'">Name</b-col>
                    <b-col>Description</b-col>
                </b-row>
            </b-list-group-item>
            <b-list-group-item 
                v-for="(item, i) in items"
                :key="i"
                style="background-color: #F2ECFF"
                >
                <div class="d-none">{{ item }}</div>
                <b-row>
                    <b-col>{{ item.field }}</b-col>          
                    <b-col :class="'pl-0 text-left'">{{ item.title }}</b-col>
                    <b-col>{{ item.description }}</b-col>
                </b-row>
            </b-list-group-item>
        </b-list-group>

    </b-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "ToggleItems",
        
        props:{
            items:{
                type: Array,
                default: () => {
                    return []
                }
            }
        }
    })
</script>
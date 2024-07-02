<template>
     <b-card 
        class="border-0"
        no-body>
        <b-list-group flush>      
            <b-list-group-item
                :class="'rounded-0'"
                style="background-color: #DDD1DC;">

                <b-row style="font-weight: 600">
                    <b-col>Short Name</b-col>          
                    <b-col :class="'pl-0'">Display Name</b-col>
                    <b-col>Description</b-col>
                    <b-col>Data Type</b-col>
                    <b-col>Default Value</b-col>
                </b-row>
            </b-list-group-item>

            <b-list-group-item 
                v-for="(item, i) in items"
                :key="i"
                style="background-color: #F2ECFF">
                <b-row>
                    <b-col>{{ item.field }}</b-col>          
                    <b-col :class="'pl-0 text-left'">{{ item.title }}</b-col>
                    <b-col>{{ item.description }}</b-col>
                    <b-col>{{ item.type }}</b-col>
                    <b-col><!-- {{ p.description }} --></b-col>
                </b-row>

                <!--Enums-->
                <b-row v-if="item.items && item.items.length > 0">

                    <div class="d-none">ToggleDetailItems{{ item }}</div>                    
                    <b-col>
                        <toggle-items
                            :items="item.items"
                        ></toggle-items>
                    
                    </b-col>

                </b-row>
                
                <!-- -->
                <b-row v-if="item.enums && item.enums.length > 0">
                    <div class="d-none">
                        ToggleDetailEnum {{ item }}
                    </div>
                    <b-col>
                        <toggle-enum
                        :items="item.enums"
                    ></toggle-enum>
                    </b-col>
                </b-row> <!-- -->
                

            </b-list-group-item>
        </b-list-group>
    </b-card>

</template>

<script lang="ts">
    import Vue from 'vue'
import ToggleItems from './ToggleItems.vue'
    export default Vue.extend({
  components: { ToggleItems },
        name: "ToggleDetail",
        
        props:{
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
        }
    })
</script>
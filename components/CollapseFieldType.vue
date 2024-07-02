<template>
     <b-collapse 
        :id="collapseId">
        <toggle-detail
            :items="items"
        >
        </toggle-detail>

    </b-collapse>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({

         props:{
            collapseId:{
                type: String,
                default: 'collapse-id'
            },
        
            items:{
                type: Array,
                default: () => {
                    return []
                }
            }
        }
    })
</script>
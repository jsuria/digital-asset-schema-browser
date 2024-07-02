 <template>
    <b-button 
        size="sm"
        :ref="toggleTrigger" 
        v-b-toggle="toggleTarget"
        class="bg-transparent text-dark px-1 py-0 ml-1 font-weight-bold">
        <span class="tog-collapsed">+</span>
        <span class="tog-expanded">-</span>
    </b-button>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "ToggleButton",
        
        props:{
            toggleTrigger:{
                type: String,
                default: 'collapse-trigger'
            },
            toggleTarget:{
                type: String,
                default: 'collapse-1'
            }
        }
    })
</script>

<style>
    .collapsed span.tog-collapsed, 
    .not-collapsed span.tog-expanded {
        display: block !important;
    }

    .not-collapsed span.tog-collapsed, 
    .collapsed .span.tog-expanded {
        display: none !important;
    }
</style>
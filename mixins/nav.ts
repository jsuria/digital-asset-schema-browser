import Vue from 'vue'
import { AppState } from '~/store/model.appstate';

export default Vue.extend({
    
    data(){
        return {
            activeMenuItem: null,
            currentPage: 'nav-link-disclaimer',
        }
    },

    computed:{
        currentStaticContent(): any {
            try {
                const result =  (this.$store.state.appstate as AppState).currentPage
                return {
                    content_id: result
                }
            } catch(e) {
                return this.currentPage
            }  
        },
    },

    methods:{
        getTokenType(tokenType: string): string {
            return (tokenType == 'blockchain') ? 'BlockchainTokenMeta':'OtherTokenMeta'
        },

        async loadStaticContent(id: string){
            await this.$store.dispatch('appstate/setStaticPage', id)
        },

        async loadNative(tokenType: string){
            await this.$store.dispatch(`tokenobject/getNative${this.getTokenType(tokenType)}`)  
        },

        async loadDistributedLedger(tokenType: string){
            await this.$store.dispatch(`tokenobject/getDistributedLedger${this.getTokenType(tokenType)}`)   
        },

        async loadFungible(){
            await this.$store.dispatch(`tokenobject/getFungibleTokenMeta`)  
        },

        async loadAuxiliary(){
            await this.$store.dispatch('tokenobject/getAuxiliaryTokenMeta')  
        },
    },

    // Load initiak static content
    async asyncData({ store }) {
        console.log('dispatching initial content...');
        await store.dispatch('appstate/setStaticPage', 'nav-link-disclaimer') 
    },
})
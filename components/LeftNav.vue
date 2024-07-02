<template>
    <div class="w-100 pt-2 px-3 pb-3" style="height: 92.5vh; background-color: #5d375e;">

         <h6 class="pt-5 pl-3 text-warning fs-5 font-weight-bold">DTI IJE v.1.0.0</h6>

        <b-nav vertical class="pl-4 py-2 flex-column">
            <b-nav-item 
                :active="currentStaticContent.content_id == 'nav-link-disclaimer'" 
                @click="loadStaticContent('nav-link-disclaimer');"
                id="nav-link-disclaimer">
                <span class="text-decoration-none text-white">Disclaimer</span>
            </b-nav-item>

            <b-nav-item
                :active="currentStaticContent.content_id == 'nav-link-releasenotes'" 
                @click="loadStaticContent('nav-link-releasenotes');"
                id="nav-link-releasenotes"
                >
                <span class="text-decoration-none text-white">Release Notes</span>
            </b-nav-item>

        </b-nav>

        <h6 class="pt-5 pl-3 text-warning fs-5 font-weight-bold">Digital Token Templates</h6>

        <b-nav vertical class="pl-4 py-2 flex-column">
            <b-nav-item 
                :active="currentStaticContent.content_id == 'nav-link-auxiliary'" 
                @click="loadStaticContent('nav-link-auxiliary'); loadAuxiliary()"
                id="nav-link-auxiliary"
                >
                <span class="text-decoration-none text-white">
                    Auxiliary Digital Token
                </span> 
            </b-nav-item>

            <b-nav-item>
                <span class="text-decoration-none text-white" v-b-toggle.collapse-native>
                    Native Digital Token
                     <b-icon icon="chevron-down" style="height: 24px; width: 24px; padding:5px"></b-icon>
                </span>
                <b-collapse id="collapse-native" class="mt-2">
                
                     <b-nav vertical class="pl-2 py-2 flex-column">
                        <b-nav-item  
                            @click="loadStaticContent('nav-link-nativeblockchain'); loadNative('blockchain')"
                            id="nav-link-nativeblockchain">
                            <span class="text-decoration-none text-white">Blockchain</span>
                        </b-nav-item>
                        <b-nav-item
                             @click="loadStaticContent('nav-link-nativeother'); loadNative('other')"
                            id="nav-link-nativeother">
                            <span class="text-decoration-none text-white">Other</span>
                        </b-nav-item>
                     </b-nav>
                </b-collapse>

            </b-nav-item>

            <b-nav-item>
                <span class="text-decoration-none text-white" v-b-toggle.collapse-distributed>
                    Distributed Ledger Native Digital Token
                     <b-icon icon="chevron-down" style="height: 24px; width: 24px; padding:5px"></b-icon>
                </span>
                <b-collapse id="collapse-distributed" class="mt-2">

                     <b-nav vertical class="pl-2 py-2 flex-column">
                        <b-nav-item
                            @click="loadStaticContent('nav-link-distributedblockchain'); loadDistributedLedger('blockchain')"
                            id="nav-link-distributedblockchain">
                            <span class="text-decoration-none text-white">Blockchain</span>
                        </b-nav-item>
                        <b-nav-item
                            @click="loadStaticContent('nav-link-distributedother'); loadDistributedLedger('other')"
                            id="nav-link-distributedother">
                            <span class="text-decoration-none text-white">Other</span>
                        </b-nav-item>
                     </b-nav>
                </b-collapse>

            </b-nav-item>

             <b-nav-item
                @click="loadStaticContent('nav-link-fungible'); loadFungible()"
                id="nav-link-fungible"
             >
                <span class="text-decoration-none text-white">Functionally Fungible Group of Digital Tokens</span>
            </b-nav-item>
       
        </b-nav>
        
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import nav from '@/mixins/nav'
import { BIcon, BIconChevronDown } from 'bootstrap-vue'
 

export default Vue.extend(
  {
      name:"LeftNav",
      mixins:[nav],
      components:{
        BIcon,
        BIconChevronDown
      },
  })
</script>

<style>
    .nav-link {
        font-size: 14px;
        font-weight: 600;
    }

    .nav-item:hover {
        background-color: #825087 !important;
        border-left: 5px solid #ffc107 !important;
    }

    .nav-item:hover .nav-link {
        padding-left: 11px !important;
    }

    .nav-item:hover .nav-link {
        padding-left: 11px !important;
    }
</style>
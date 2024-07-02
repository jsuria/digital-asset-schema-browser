<template>
 <!--
    fields - table headers
    items - table data
  -->
  <b-table 
      small 
      :fields="fields"
      :items="allSections"
      responsive="sm"
      outlined
      fixed
  >     

        <!--
            [+] Component
        -->
        <template #cell(field_type)="row">
          <b-button 
              size="sm"
              :id="`collapse-trigger-component-${wordifyString(tokenSchema.title)}-${row.index}`"
              :ref="`collapse-trigger-component-${wordifyString(tokenSchema.title)}-${row.index}`"
              @click="row.toggleDetails" 
              class="bg-transparent text-dark px-1 py-0 m-0 font-weight-bold collapse-trigger-component">
              {{ row.detailsShowing ? '-' : '+' }} 
          </b-button>
              Component
        </template>

        <template #row-details="row">
             <b-card
              no-body>
                  <b-list-group flush
                    >
                    <!--
                        Start Component  [Auxiliary Digital Token Header, Auxiliary Digital Token Normaitve, n+1]
                    -->          
                    <b-list-group-item>
                        <b-row>
                            <!-- taken from fields -->
                            <b-col>Start Component</b-col>
                            <!-- taken from fields -->

                            <b-col class="pl-0 text-left">{{ tokenSchema.title }} {{ row.item.json_name }}</b-col>
                            <b-col>{{ row.item.display_name }}</b-col>
                            <b-col>{{ row.item.required }}</b-col>          
                            <b-col>{{ row.item.description }}</b-col>
                        </b-row>
                    </b-list-group-item>

                      <!--
                          [+] Field
                          [+] Array
                      -->

                   <!-- -->   
                       <b-list-group-item
                          :class="'p-0'"
                          v-for="(componentRow, index) in row.item.componentFields"
                          :key="index"
                      > <!-- -->
                         <div class="d-none">{{ componentRow }}</div>
                         <b-row
                            class="py-2 mx-0 "
                            :class="{ 'array-row-bg' : componentRow.type == 'array' }"
                              >
                              <b-col class="pl-0">
                                  <toggle-button
                                    :toggleTrigger="`collapse-trigger-${wordifyString(tokenSchema.title)}-${wordifyString(componentRow.field)}-${index}`"
                                    :toggleTarget="`collapse-${wordifyString(tokenSchema.title)}-${wordifyString(componentRow.field)}-${index}`"
                                  ></toggle-button>
                                  {{ componentRow.type == 'array' ? 'Array' : 'Field' }}
                              </b-col>
                              <b-col class="text-left">{{ componentRow.field }}</b-col>
                              <b-col>&nbsp;</b-col>          
                              <b-col>&nbsp;</b-col>
                              <b-col>{{ componentRow.description }}</b-col>
                          </b-row>

                          <collapse-array-type  
                              v-if="componentRow.type == 'array'"
                              :items="componentRow.items"
                              :schemaTitle="tokenSchema.title"
                              :parentCollapseTitle="tokenSchema.title + ' ' + componentRow.field"
                              :parentCollapseId="`collapse-${wordifyString(tokenSchema.title)}-${wordifyString(componentRow.field)}-${index}`"
                          >
                          </collapse-array-type>

                          <collapse-field-type
                            v-else
                            :collapseId="`collapse-${wordifyString(tokenSchema.title)}-${wordifyString(componentRow.field)}-${index}`"
                            :items="[componentRow]"
                          >
                          </collapse-field-type>


                      </b-list-group-item>  
                  </b-list-group>

            </b-card> 
                                            
        </template>

    
  </b-table>
</template>

<script lang="ts">
  import Vue from 'vue'
  import core from '@/mixins/core'
  import { BIconDownload } from 'bootstrap-vue'

  export default Vue.extend(
  {
      name:"TableTokenTemplateListing",
      components:{
        BIconDownload
      },
      mixins:[
        core
      ]
  })
</script>

<style lang="css">

    h3 {
      color: #4C214D
    }

    table thead tr {
      background-color: #4C214D !important;
      color: #fff !important;
    }

    table tbody tr {
      background-color: #DEDCE1;
    }

    .array-row-bg {
      background-color: #DEDCE1 !important;
      font-weight: 600 !important;
    }

    table tbody tr td {
      margin: 0 !important;
      padding: 5px !important;
      font-weight: 600 !important;
    }

    table tbody tr.b-table-details td {
      padding: 0 !important;
      font-weight: normal !important;
    }


    table tbody .card {
      border-radius: 0 !important;
    }

    table tbody td ,table tbody button {
      font-size: 12px !important;
    }

    table thead tr div {
      font-size: 14px !important;
      font-weight: 600 !important;
    }

    .table th,
    .table td {
      border-top: 1px solid #BEBFC9;
    }

    .list-group-item:first-child {
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
    }

    span.tog-expanded, span.tog-expanded {
      display: none;
    }

    .collapsed span.tog-collapsed, 
    .not-collapsed span.tog-expanded {
      display: block !important;
    }

    .not-collapsed span.tog-collapsed, 
    .collapsed .span.tog-expanded {
      display: none !important;
    }

     a.download-button {   
      background-color: #FFC371;
      font-size: 15px;
      font-weight: bold;
      color: #4c214d;      
      border-radius: 5px;
      width: 179px;
      margin-top: 10px;
      margin-bottom: 10px;       
     }     

      a.download-button .bi-download {
        margin-left: -5px !important;
        margin-right: 5px !important;
      }

      a.download-button path {
        fill: #4c214d !important;        
      }

      a.download-button:hover {
          background-color: #4c214d !important;      
          color:#FFC371 !important;    
      }

      a.download-button:hover path {
            fill: #FFC371 !important;      
      } 

    .dti-content p {
      font-size: 14px !important;
    }
</style>
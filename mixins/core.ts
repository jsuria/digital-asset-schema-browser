import Vue from 'vue'

import { wordifyString } from './common'
import { dedupeArray } from './common'
import { underscorifyString } from './common'
import { contentIdHas } from './common'

import { TokenObjectState } from '@/store/model.tokenobjectstate'
import { AppState } from '@/store/model.appstate'

export default Vue.extend({

    data() {
        return {
            schema: {
                title: '',
                modified: '',
                description:'',
            },
            properties: null,
            currentDtiType: '',

            fields: [
                { 
                    key: 'field_type', 
                    label: 'Field, Component or Array' 
                },
                { 
                    key: 'json_name', 
                    label: 'JSON Name' 
                },
                { 
                    key: 'display_name', 
                    label: 'Display Name' 
                },
                { 
                    key: 'required', 
                    label: 'Required' 
                },
                { 
                    key: 'description', 
                    label: 'Description' 
                }
              ],
             
            currentToggle:{
                hidden: false,
                id: null
            },

            currentPage: 'nav-link-disclaimer',

            currentExpandedToggles:[],

            requiredFields:[] as any
        }
    },

    methods:{

        wordifyString(str: string): string {
            return wordifyString(str)
        },

        contentIdHas(needle: string, haystack: any){
            return contentIdHas(needle, haystack)
        },

        getEnumProperties(enumObj: any){
            let detailTable = []

            console.log("getEnumProperties: ", enumObj)
            
            for(let i = 0; i < enumObj?.enum?.length; i++) {
                detailTable.push({
                    enum: enumObj?.enum[i],
                    name: enumObj?.name[i],
                });
            }
            return detailTable;
        },

        getItemPropertiesInformative(itemObj: any){

            const detailEntries = Object.entries(itemObj)

            console.log("getItemProperties: ", detailEntries)
            console.log("getItemProperties (raw): ", itemObj)

            return detailEntries.map((elem, i) => {

                let valuePair = elem[1] as any

                let baseObj =  {
                    field: elem[0][1],
                    description: (valuePair[1] as any)?.description,
                    title: (valuePair[1] as any)?.title,
                    type: (valuePair[1] as any)?.type
                }


                // test for enums inside item.properties in normative
                if((valuePair[1] as any)?.enum != undefined){
                    return Object.assign(
                        baseObj, 
                        {
                            enums: this.getEnumProperties({
                                enum: (valuePair[1] as any)?.enum,
                                description: (valuePair[1] as any)?.elaboration,
                                name: (valuePair[1] as any)?.options?.enum_titles
                            })
                        }
                        
                     )
                }

                return baseObj
            })
        },

        getItemProperties(itemObj: any){
            const detailEntries = Object.entries(itemObj)

            console.log("getItemProperties: ", detailEntries)
            console.log("getItemProperties (raw): ", itemObj)

            return detailEntries.map((elem, i) => {
                let baseObj =  {
                    field: elem[0],
                    description: (elem[1] as any)?.description,
                    title: (elem[1] as any)?.title,
                    type: (elem[1] as any)?.type
                }


                // test for enums inside item.properties in normative
                if((elem[1] as any)?.enum != undefined){
                    return Object.assign(
                        baseObj, 
                        {
                            enums: this.getEnumProperties({
                                enum: (elem[1] as any)?.enum,
                                description: (elem[1] as any)?.elaboration,
                                name: (elem[1] as any)?.options?.enum_titles
                            })
                        }
                        
                     )
                }

                return baseObj

                // Forks
                /* 
                    if((elem[1] as any)?.pattern == undefined){
                        return baseObj
                    } else {
                        return Object.assign(
                            baseObj, 
                            {
                                pattern: (elem[1] as any)?.pattern,
                                format: (elem[1] as any)?.format
                            }
                        )
                    } 
                */


            })
        }


    },

    computed:{

        parentCollapseSections(): any {
            const coll = Object.entries(document.getElementsByClassName("collapse-trigger-component"))
            return coll.map((elem, i) => {
            })
        },

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

        allSections(): any {
            let sections = [
                this.headerComponent as never, 
                this.informativeComponent as never, 
                this.metadataComponent as never]
    
            const hasNormative = (this.$store.state.tokenobject as TokenObjectState).properties.Normative
            if(hasNormative){
                sections.push(this.normativeComponent as never)
            }

            return sections
        },

        tokenSchema(): any {
            const result = this.$store.state.tokenobject as TokenObjectState
            return {
                title: result.title,
                modified: result.LastModifyDateTime,
                description: result.description
            }
        },

        informativeComponent(): any {
            const properties = (this.$store.state.tokenobject as TokenObjectState).properties
            const informative = Object.entries(properties.Informative.properties)
        
            let parentComponent = {
                field_type: 'Component',
                json_name: 'Informative',
                display_name: '',
                required: true,
                description: '',
            }
        
            let childrenComponent = informative.map((elem, i) => {
        
                console.log("[informativeComponent] mapping childrenComponent: ", elem)
        
                let baseObj =  {
                    field: elem[0],
                    description: (elem[1] as any)?.description,
                    title: (elem[1] as any)?.title,
                    type: (elem[1] as any)?.type
                }
                
                if((elem[1] as any)?.items != undefined) {
                    // Forks
                    const informativeItems = Object.entries((elem[1] as any)?.items?.properties)
                    console.log("[informativeComponent] mapping items.properties: ", informativeItems)

                    // Check for enum, elaboration,options.enum_titles
        
                    return Object.assign(
                        baseObj, 
                        {   
                            items: this.getItemPropertiesInformative(informativeItems)
                        }  
                    )
                } else {
                    return baseObj
                }
                /**/
                
            });
        
            console.log("[informativeComponent] parentComponent: ", parentComponent)
            console.log("[informativeComponent] childrenComponent: ", childrenComponent)
        
            return Object.assign(
                parentComponent, 
                {
                    componentFields: childrenComponent
                }
            );
        },

        normativeComponent(): any {
            const properties = (this.$store.state.tokenobject as TokenObjectState).properties
            const normative = Object.entries(properties.Normative.properties)

            let parentComponent = {
                field_type: 'Component',
                json_name: 'Normative',
                display_name: '',
                required: true,
                description: '',
            }

            let childrenComponent = normative.map((elem, i) => {

                console.log("[normativeComponent] mapping childrenComponent: ", elem)

                let baseObj =  {
                    field: elem[0],
                    description: (elem[1] as any)?.description,
                    title: (elem[1] as any)?.title,
                    type: (elem[1] as any)?.type
                }

                /**/   
                if((elem[1] as any)?.enum != undefined){

                    console.log({
                        enum: (elem[1] as any)?.enum,
                        description: (elem[1] as any)?.elaboration,
                        name: (elem[1] as any)?.options?.enum_titles
                    })

                    return Object.assign(
                        baseObj, 
                        {
                            enums: this.getEnumProperties({
                                    enum: (elem[1] as any)?.enum,
                                    description: (elem[1] as any)?.elaboration,
                                    name: (elem[1] as any)?.options?.enum_titles
                                })
                        }
                    )
                } else if((elem[1] as any)?.items != undefined) {
                    // Forks
                    try {
                        const normativeItems = Object.entries((elem[1] as any)?.items?.properties)

                        return Object.assign(
                            baseObj, 
                            {   
                                items: this.getItemProperties(normativeItems)
                            }  
                        )
                    } catch(e) {
                        return baseObj
                    } 

                } else {
                    return baseObj
                }
                /**/
                
            });

            console.log("[normativeComponent] parentComponent: ", parentComponent)
            console.log("[normativeComponent] childrenComponent: ", childrenComponent)

            return Object.assign(
                parentComponent, 
                {
                    componentFields: childrenComponent
                }
            );
            
        },

        headerComponent(): any {
            const properties = (this.$store.state.tokenobject as TokenObjectState).properties
            const header = Object.entries(properties.Header.properties)

            let parentComponent = {
                    field_type: 'Component',
                    json_name: 'Header',
                    display_name: '',
                    required: true,
                    description: '',
                }
            
            let childrenComponent = header.map((elem, i) => {

                let baseObj =  {
                    field: elem[0],
                    description: (elem[1] as any)?.description,
                    title: (elem[1] as any)?.title,
                    type: (elem[1] as any)?.type
                }

                /**/   
                if((elem[1] as any)?.enum == undefined){
                    return baseObj
                } else {
                    return Object.assign(
                        baseObj, 
                        this.getEnumProperties({
                            items:{
                                enum: (elem[1] as any)?.enum,
                                description: (elem[1] as any)?.elaboration,
                                name: (elem[1] as any)?.options?.enum_title
                            }
                        })
                    )
                } /**/
            });

            return Object.assign(
                parentComponent, 
                {
                    componentFields: childrenComponent
                }
            );


        },

        metadataComponent(): any {
            const properties = (this.$store.state.tokenobject as TokenObjectState).properties
            const metadata = Object.entries(properties.Metadata.properties)

            console.log("[metadataComponent]: ", metadata)

            let parentComponent = {
                field_type: 'Component',
                json_name: 'Metadata',
                display_name: '',
                required: true,
                description: '',
            }

            let childrenComponent = metadata.map((elem, i) => {
                return  {
                    field: elem[0],
                    description: (elem[1] as any)?.description,
                    title: (elem[1] as any)?.title,
                    type: (elem[1] as any)?.type
                }
            })

            return Object.assign(
                parentComponent, 
                {
                    componentFields: childrenComponent
                }
            );
        },

        currentJsonFile(): string {
            return `${underscorifyString(this.tokenSchema.title)}.json`
        },
    },

    /**
     * Reloads on route changes
     *  
     */
    watch: {
        async $route() {
            await this.$nuxt.refresh()
            window.scrollTo(0, 0)
        }
    },

    async asyncData({ store }) {
        console.log('dispatching initial content...');
        await store.dispatch('appstate/setStaticPage', 'nav-link-disclaimer') 
    },

    // Need to listen for collapse emissions
    mounted() {

        let that = this;

        this.$root.$on('bv::collapse::state', (collapseId: any, isJustShown: any) => {
            console.log('collapseId:', collapseId)
            console.log('isJustShown:', isJustShown)
            
            if(!isJustShown){
                dedupeArray(that.currentExpandedToggles)

                if(!contentIdHas(collapseId,['collapse-distributed', 'collapse-native'])){
                    that.currentExpandedToggles.push(collapseId as never)
                }
            } 

            console.log(that.currentExpandedToggles)
        })

        this.$root.$on('bv::collapse::sync-state', (collapseId: any, isJustShown: any) => {
            console.log('[sync-state] collapseId:', collapseId)
            console.log('[sync-state] isJustShown:', isJustShown)

            console.log(that.currentExpandedToggles)
        })

        // Get all parent toggles to be accessed later

    }
})
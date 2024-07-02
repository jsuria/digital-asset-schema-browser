import { ActionContext } from 'vuex'
import fetch from 'isomorphic-fetch'
import { TokenObjectState } from "./model.tokenobjectstate"
import { jsonUrls } from './enum.jsonurls'

export function state(): TokenObjectState {
    return {
        title:'',
        LastModifyDateTime:'',
        description:'',
        properties:{
            title:'',
            description:'',
            Header:{
                type:'',
                properties: [],
                required: [],
                additionalProperties: false
            },
            Informative:{
                type:'',
                properties: [],
                required: [],
                additionalProperties: false
            },
            Normative:{
                type:'',
                properties: [],
                required: [],
                additionalProperties: false
            },
            Metadata:{
                type:'',
                properties: [],
                required: [],
                additionalProperties: false
            },

        },
    }
}

export const mutations = {
    setTokenObjects(
        state: TokenObjectState,
        payload: any 
        ){
            state.title = payload.title
            state.LastModifyDateTime = payload.modified
            state.description = payload.description 
            state.properties = payload.properties
    },

    // Optional entries not found in the main JSON file
    // Contains extended content like sample values, descriptions etc
    // Generated as separate 'tag' html files
    setLinkedInfo(){

    },
    resetLinkedInfo(){}
}

const asyncFetchAction = async function(
    jsonURL: string
    ) {

    const jsonResponse = await fetch(`/json/${jsonURL}`)
    return jsonResponse.json()
}

export const actions = {

    async getAuxiliaryTokenMeta(
        { commit }: ActionContext<TokenObjectState, TokenObjectState>
    ){
        const { 
                title, 
                LastModifyDateTime, 
                description, 
                properties 
        } = await asyncFetchAction(jsonUrls.AUXILIARY)

        commit(
            'setTokenObjects',
            {
               title: title, 
               modified: LastModifyDateTime,
               description: description,
               properties: properties
            }
        )
    },

    async getNativeBlockchainTokenMeta(
        { commit }: ActionContext<TokenObjectState, TokenObjectState>
    ){
        const { 
            title, 
            LastModifyDateTime, 
            description, 
            properties 
        } = await asyncFetchAction(jsonUrls.NATIVE_BLOCKCHAIN)

        commit(
            'setTokenObjects',
            {
            title: title, 
            modified: LastModifyDateTime,
            description: description,
            properties: properties
            }
        )
    },
    async getNativeOtherTokenMeta(
        { commit }: ActionContext<TokenObjectState, TokenObjectState>
    ){
        const { 
            title, 
            LastModifyDateTime, 
            description, 
            properties 
        } = await asyncFetchAction(jsonUrls.NATIVE_OTHER)

        commit(
            'setTokenObjects',
            {
            title: title, 
            modified: LastModifyDateTime,
            description: description,
            properties: properties
            }
        )
    },
    async getFungibleTokenMeta(
        { commit }: ActionContext<TokenObjectState, TokenObjectState>
    ){
        const { 
            title, 
            LastModifyDateTime, 
            description, 
            properties 
        } = await asyncFetchAction(jsonUrls.FUNGIBLE)

        commit(
            'setTokenObjects',
            {
            title: title, 
            modified: LastModifyDateTime,
            description: description,
            properties: properties
            }
        )
    },
    async getDistributedLedgerBlockchainTokenMeta(
        { commit }: ActionContext<TokenObjectState, TokenObjectState>
    ){
        const { 
            title, 
            LastModifyDateTime, 
            description, 
            properties 
        } = await asyncFetchAction(jsonUrls.DISTRIB_LEDGER_BLOCKCHAIN)

        commit(
            'setTokenObjects',
            {
            title: title, 
            modified: LastModifyDateTime,
            description: description,
            properties: properties
            }
        )
    },
    async getDistributedLedgerOtherTokenMeta(
        { commit }: ActionContext<TokenObjectState, TokenObjectState>
    ){
        const { 
            title, 
            LastModifyDateTime, 
            description, 
            properties 
        } = await asyncFetchAction(jsonUrls.DISTRIB_LEDGER_OTHER)

        commit(
            'setTokenObjects',
            {
            title: title, 
            modified: LastModifyDateTime,
            description: description,
            properties: properties
            }
        )
    },

}

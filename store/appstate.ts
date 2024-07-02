import { ActionContext } from 'vuex'
import { AppState } from './model.appstate'

export function state(): AppState {
    return {
        currentPage:''
    }
}

export const mutations = {

    setCurrentPage(
        state: AppState,
        payload: string
    ){
        state.currentPage = payload
    }
}

export const actions = {
    setStaticPage(
        { commit }: ActionContext<AppState, AppState>,
        staticContentId: string
    ){
        commit('setCurrentPage', staticContentId)
    }
}
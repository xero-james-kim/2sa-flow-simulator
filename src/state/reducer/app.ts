import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actions } from '../actions/index';
import { AppState, DomainState } from '../types';


const initialState: AppState = {
    mobile: actions.mobile_initial_state({}),
    browser: actions.browser_initial_state({}),
    api: actions.api_initial_state({}),
    es: actions.es_initial_state({}),
    argEditor: {
    }
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        act: (state, action: PayloadAction<DomainState>) => {
            const domain = actionToDomain(action.payload)
            if(domain) {
                if(domain === "es") {
                    state[domain] = {
                        ...state[domain],
                        actions: [
                            ...state[domain].actions,
                            ...action.payload.actions
                        ]
                    }
                } else {
                    state[domain] = {
                        ...action.payload,
                    } 
                }
            }
            state.argEditor = action.payload.args
        }, 
        editArg: (state, action: PayloadAction<{args: any}>) => {
            const { args } = action.payload
            state.argEditor = args
        }
    }
})

export const appActions = slice.actions
export const appReducer = slice.reducer 

const actionToDomain = (domainState: DomainState) => {
    const split = domainState.type.split('_')
    if(split.length > 0 
        && (split[0] === "mobile" 
        || split[0] === "browser"
        || split[0] === "api"
        || split[0] === "es")
       ){
        return split[0]
    }
    return null
}
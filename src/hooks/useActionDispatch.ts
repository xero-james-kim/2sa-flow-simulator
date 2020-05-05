import React from 'react'
import { useDispatch } from 'react-redux';
import { appActions } from '../state/reducer/app';
import { DomainState, AppAction } from '../state/types';
import { actions } from '../state/actions';


type DispatchOptions = {
    correlation?: string
    delay?: number
}

export const useDomainDispatch = () => {
    const dispatch = useDispatch()

    /// otherwise finds the action
    /// default to first choice 
    const dispatchAction = (a: AppAction[], text?: string, opts: DispatchOptions = {}) => {
        const { correlation, delay } = opts
        const action = a.find(x => x.text === text)
        if(text && action) {
            dispatchActionCallback(action, correlation)()
        } else if(a.length) {
            dispatchActionCallback(a[0], correlation)()
        }
    }

    const dispatchActionCallback = ({ triggers }: AppAction, correlation?: string) => () => {
        triggers.forEach(({ action, args})=> {
            dispatch(
                appActions.act(actions[action as keyof typeof actions]({ ...args, _correlation: correlation })))
        })
    }
    
    return {
        dispatchAction,
        dispatchActionCallback
    }
}
import React, { useEffect } from 'react'
import { AppState, DomainState } from '../state/types';
import { usePrevious } from '../state/utils/usePrevious';
import { useTypedSelector } from '../state/store';
import { actions } from '../state/actions/index';

type DomainKey = Exclude<keyof AppState, "argEditor">
type a = typeof actions & { always: "" }
export type StateListener = {
    [P in keyof a]?: (prevState: DomainState | undefined, state: DomainState) => void
}

export const useStateChangeListener = (domain: DomainKey, listeners: StateListener) => {
    const state = useTypedSelector(x => x[domain]) 
    const prevState = usePrevious<DomainState>(state)
    
    useEffect(()=> {
        const onStateChange = buildStateChangeListener(prevState, state)
        for(let key in listeners)  {
            const noop = (p: DomainState | undefined, s: DomainState)=>{}
            onStateChange(key, listeners[key as keyof typeof listeners] || noop)
        }
    }, [prevState, state])
}

export const buildStateChangeListener = (prevState: DomainState | undefined, currState: DomainState) => (to:string, cb: (p: DomainState | undefined, curr: DomainState)=> void) => {
    if(to === "always") {
        if(!prevState) {
            cb(prevState, currState)
            return
        }
        if(prevState && prevState.id !== currState.id) {
            cb(prevState, currState)
            return
        }
    }
    if(!prevState && currState.type === to) {
        cb(prevState, currState)
        return
    }
    if(prevState && prevState.id !== currState.id && currState.type === to)  {
        cb(prevState, currState)
        return
    }

}
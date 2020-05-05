import React from 'react'
import { useTypedSelector } from '../store';
import { useDomainDispatch } from '../../hooks/useActionDispatch';

type Props = {
    domain: "mobile" | "browser" | "api"
}

export const DomainComponent: React.FC<Props> = ({ domain }) => {
    const state = useTypedSelector(x => x[domain])
    const { dispatchActionCallback } = useDomainDispatch()

    return <div>
       {state.message}  
       {
            state.actions.map(action =>{
                return <button onClick={dispatchActionCallback(action)}>
                    {action.text}
                </button>
            })            
       }
    </div>
}

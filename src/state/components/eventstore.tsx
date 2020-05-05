import React from 'react'
import { useTypedSelector } from '../store';
import { useDomainDispatch } from '../../hooks/useActionDispatch';

type Props = {
}

export const EventStoreComponent: React.FC<Props> = () => {
    const state = useTypedSelector(x => x.es)

    return <div>
        <h2 className="title">Eventstore</h2>
       {
            state.actions.map(action =>{
                return <div>
                    {action.text}
                </div>
            })            
       }
    </div>
}

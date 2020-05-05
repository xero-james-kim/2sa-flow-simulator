import React from 'react'
import { useTypedSelector } from '../store';
// import { Card, Button } from 'antd';
import { DomainState, AppAction } from '../types';
import { useTempStore } from '../../hooks/useTempStore';
import { StateListener, useStateChangeListener } from '../../hooks/useStateChangeListener';
import { useDomainDispatch } from '../../hooks/useActionDispatch';

type Props = {
}

type PushNotification = DomainState & {
    isLoading: boolean
}

export const MobileComponent: React.FC<Props> = () => {
    const state = useTypedSelector(x => x.mobile)
    const push = useTempStore<PushNotification>()
    const {  dispatchActionCallback } = useDomainDispatch()

    const listeners: StateListener = {
        mobile_push_received: ()=> {
            push.add({...state, isLoading: false, id: state.correlation || ""})
        },
        // mobile_push_waiting_for_result: ()=> {
        //     push.update({ ...push.find(state.correlation), isLoading: true })
        // },
        // mobile_push_success: (prev, curr)=> {
        //     push.remove(curr.correlation)
        // },
        // mobile_push_decline: (prev, curr)=> {
        //     push.remove(curr.correlation)
        // },
        // mobile_push_is_old: (prev, curr)=> {
        //     push.update({ ...push.find(state.correlation), isLoading: false, message: curr.message, actions: [] })
        // }
    }

    const onClick = (action: AppAction, id: string) => () => {
        push.remove(id)
        dispatchActionCallback(action, id)()
    }

    useStateChangeListener("mobile", listeners)
    return <div>
        <h2 className="title">Mobile</h2>
        {
            push.getAll().map(push => {
                if(push.isLoading){
                    return <div className="box">
                            loading...
                    </div> 
                }
                return (<div className="box">
                    {push.message}
                    {
                        push.actions.map(action=> {
                            return (
                                <div>
                                    <button className="button" onClick={onClick(action, push.id)}>
                                        {action.text}
                                    </button>
                                </div>
                            )
                        })
                    }
                    </div>
                )
        })
    }
    </div>
}

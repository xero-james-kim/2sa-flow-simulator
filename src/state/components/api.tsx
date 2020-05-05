import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../store';
// import { Card, Button } from 'antd';
import { useStateChangeListener, StateListener } from '../../hooks/useStateChangeListener';
import { useDomainDispatch } from '../../hooks/useActionDispatch';
import { Guid } from 'guid-typescript';
import { AppAction } from '../types';

type Props = {}

export const ApiComponent: React.FC<Props> = () => {
    const state  = useTypedSelector(x => x.api)
    const { correlation, actions, message } = state
    const { dispatchAction, dispatchActionCallback } = useDomainDispatch()
    const [latestToken, setToken] = useState<string | null>(null)

    const listeners: StateListener = {
        api_push_result_received: (prev, curr)=> {
            if(latestToken === correlation) {
                if(curr.args.userAccepted) {
                    dispatchAction(actions, "accepted", { correlation }) 
                } else {
                    dispatchAction(actions, "declined", { correlation }) 
                }
            } else {
                console.log("old push")
                dispatchAction(actions, "old push", { correlation })
            }
        },
        api_push_request_received: ()=> {
            // const token = Guid.create().toString()
            // setToken(token)
            // dispatchAction(actions, "send push to mobile", { correlation: token })
        }
    }

    const [pushId, setPushId] = useState<string | null>(null)

    const sendPush =(action: AppAction) => ()=> {
        const token = Guid.create().toString()
        setToken(token)
        dispatchActionCallback(action, token)()
    }

    // api needs to send correlation id and store it
    useStateChangeListener("api", listeners)

    return <div>
        <h2 className="title">API</h2>
        <div className="box">
            {message}  
            <div>
{
            state.actions.map(action =>{
                return <button className="button" onClick={sendPush(action)}>
                    {action.text}
                </button>
            })            
       }
            </div>
                    
        </div>

    </div>
}

import React, { useState, useEffect } from 'react'
import { useTypedSelector } from '../store';
import { useDomainDispatch } from '../../hooks/useActionDispatch';
import { StateListener, useStateChangeListener } from '../../hooks/useStateChangeListener';
import { useTimeoutManager } from '../../hooks/useTimeoutManager';

type Props = {}
export const BrowserComponent: React.FC<Props> = () => {
    const browserState = useTypedSelector(x => x.browser)
    const { dispatchAction, dispatchActionCallback } = useDomainDispatch()
    const { addTimeout, clearTimeouts} = useTimeoutManager()

    const listeners: StateListener = {
        browser_push_sent: (prev, curr)=> {
            addTimeout(()=> {
                dispatchAction(browserState.actions, "send push") 
            }, 5000)
        },
        always: () => {
            clearTimeouts()
        }
    }

    useStateChangeListener("browser", listeners)

    return <div>
        <h2 className="title">Browser</h2>
        <div className="box">
        {browserState.message}  
        <div>
       {
            browserState.actions.map(action =>{
                return <button className="button" onClick={dispatchActionCallback(action)} disabled={action.isDisabled}>
                    {action.text}
                </button>
            })            
       }
        </div>

        </div>
       
    </div>
}

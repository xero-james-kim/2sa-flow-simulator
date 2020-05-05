import React from 'react'
import { DomainComponent } from './domain';
import { MobileComponent } from './mobile';
import { BrowserComponent } from './browser';
import { ApiComponent } from './api';
import { EventStoreComponent } from './eventstore';

type Props = {

}

export const Page: React.FC<Props> = () => {

    return <div className="columns" style={{margin: "20px"}}>
        <div className="column">
            <BrowserComponent />
        </div>
        <div className="column">
            <MobileComponent />
        </div>
        <div className="column">
            <ApiComponent />
        </div>
        <div className="column">
            <EventStoreComponent />
        </div>
    </div>
}
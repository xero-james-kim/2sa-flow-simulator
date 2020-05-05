export type AppState = {
    mobile: DomainState
    browser: DomainState
    api: DomainState
    es: DomainState
    argEditor: { [key: string]: string }
}

export type UIState = {
    lastEventType: string
}

export type AppAction = {
    text: string,
    isDisabled?: boolean
    correlation?: string
    triggers: { action: string, args: any}[]
}

export type DomainState = {
    id: string
    to?: string
    correlation?: string
    args?: any
    type: string
    description?: string
    message: string
    delay?: number
    actions: AppAction[]
}

export type PollingState =  {
    status: string,
    message: string
}

export type EventStoreState = {
    events: string[]    
}

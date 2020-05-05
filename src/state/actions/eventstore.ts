import { Guid } from "guid-typescript";


const es_append_event = (args: any) => ({
    id: Guid.create().toString(),
    args,
    type: "es_append_event",
    message: "",
    description: "",
    actions: [
       { text: args.event, triggers: [] } 
    ]
})

const es_initial_state = (args:any) => ({
    id: Guid.create().toString(),
    args,
    type: "es_initial_state",
    message: ``,
    description: "",
    actions: []
})

export const esActions = {
    es_append_event,
    es_initial_state
}

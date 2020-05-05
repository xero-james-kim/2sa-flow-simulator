import { Guid } from "guid-typescript";

const mobile_push_received = (args: any) => {
    return {
    id: Guid.create().toString(),
    type: "mobile_push_received",
    correlation: args._correlation,
    message: `Logging in from ${args.deviceName}, ${args.location}. Is this you? `,
    description: "",
    actions: [
        {
            text: "yes",
            triggers: [
                { action: "api_push_result_received", args: {...args, userAccepted: true} },
                { action: "mobile_push_waiting_for_result", args: {...args} },
            ]
        },
        {
            text: "no",
            triggers: [
                { action: "api_push_result_received", args: {...args, userAccepted: false} },
                { action: "mobile_push_waiting_for_result", args: {...args} },
            ]
        }
    ],
    args
}}

const mobile_push_waiting_for_result = (args: any) => ({
    id: Guid.create().toString(),
    correlation: args._correlation,
    type: "mobile_push_waiting_for_result",
    message: ``,
    description: "",
    actions: [],
    args
})

const mobile_push_success = (args: any) => ({
    id: Guid.create().toString(),
    correlation: args._correlation,
    type: "mobile_push_success",
    message: `login successful!`,
    description: "",
    actions: [],
    args
})

const mobile_push_decline = (args: any) => ({
    id: Guid.create().toString(),
    correlation: args._correlation,
    type: "mobile_push_decline",
    message: `login successful!`,
    description: "",
    actions: [],
    args
})


const mobile_push_is_old = (args: any) => ({
    id: Guid.create().toString(),
    correlation: args._correlation,
    type: "mobile_push_is_old",
    message: `push is old!`,
    description: "",
    actions: [],
    args
})

const mobile_initial_state = (args: any) => ({
    id: Guid.create().toString(),
    type: "mobile_initial_state",
    message: "Waiting for input",
    actions: []
})

export const mobileActions = {
    mobile_push_received,
    mobile_initial_state,
    mobile_push_waiting_for_result,
    mobile_push_success,
    mobile_push_is_old,
    mobile_push_decline
}
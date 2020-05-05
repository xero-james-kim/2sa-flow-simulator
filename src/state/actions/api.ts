import { Guid } from "guid-typescript";

const api_push_result_received = (args: any) => ({
    id: Guid.create().toString(),
    type: "api_push_result_received",
    correlation: args._correlation,
    description: "api result is received",
    message: `received mobile response`,
    args,
    actions: [
        {
            text: "accepted",
            triggers: [
                { action: "api_push_result_valid_and_accepted", args },
            ]
        },
        {
            text: "old push",
            triggers: [
                { action: "api_push_result_stale", args },
                // { action: "api_push_result_sent", args: {}}
            ]
        },
        {
            text: "declined",
            triggers: [
                { action: "api_push_result_valid_and_declined", args },
            ]
        }
    ]
})

const api_push_result_valid_and_accepted = (args:any) => ({
    id: Guid.create().toString(),
    type: "api_push_result_valid_and_accepted",
    correlation: args._correlation,
    description: "push response from mobile is valid & user accepted",
    message: `push response from mobile is valid & user accepted`,
    delay: 300,
    args,
    actions: [
        {
            text: "ok",
            triggers: [
                { action: "mobile_push_success", args },
                { action: "browser_sign_in_success", args },
                { action: "es_append_event", args: { event: "UserSignInSucceeded" } },
                { action: "api_push_result_sent", args: {}}
            ]
        },
        {
            text: "simulate failure",
            triggers: [
                { action: "mobile_push_success", args },
            ]
        },
    ]
})

const api_push_result_valid_and_declined = (args: any) => ({
    id: Guid.create().toString(),
    type: "api_push_result_valid_and_declined",
    correlation: args._correlation,
    description: "api result is received",
    message: `push response from mobile is valid but user declined`,
    args,
    actions: [
        {
            text: "send back delined response",
            triggers: [
                { action: "mobile_push_decline", args },
                { action: "browser_sign_in_declined", args },
                { action: "es_append_event", args: { event: "UserSignInDeclined" } },
                { action: "api_push_result_sent", args: {}}
            ]
        }
    ]
})

const api_push_result_stale =(args: any) => ({
    id: Guid.create().toString(),
    type: "api_push_result_stale",
    correlation: args._correlation,
    description: "api result is received",
    message: `push response from mobile is stale, there are newer pushes pending`,
    args,
    actions: [
        {
            text: "send back stale response",
            triggers: [
                { action: "mobile_push_is_old", args },
            ]
        }
    ]
})


const api_push_request_received = (args: any) => ({
    id: Guid.create().toString(),
    type: "api_push_request_received",
    correlation: args._correlation,
    args,
    description: "got the request to send push request from web",
    message: `sending push notification`,
    actions: [
        {
            text: "send push to mobile",
            triggers: [
                { action: "mobile_push_received",  args: {...args }},
                { action: "api_push_request_sent", args: {...args }},
                { action: "es_append_event", args: { event: "UserSignInStarted" } },
            ]
        }
    ]
})

const api_push_request_sent = (args: any) => ({
    id: Guid.create().toString(),
    type: "api_push_request_sent",
    description: "push sent, waiting for response",
    message: `API sent back response to mobile and appended event to ES`,
    delay: 300,
    actions: [],
    args
})

const api_push_result_sent = (args: any) => ({
    id: Guid.create().toString(),
    type: "api_push_result_sent",
    description: "api result has been sent",
    message: `API sent back response to mobile and appended event to ES`,
    delay: 300,
    actions: [],
    args
})

const api_initial_state = (args: any) => ({
    id: Guid.create().toString(),
    type: "api_initial_state",
    message: "In initial state",
    actions: [],
    args
})

export const apiActions = {
    api_push_result_received,
    api_initial_state,
    api_push_result_sent,
    api_push_request_received,
    api_push_request_sent,
    api_push_result_stale,
    api_push_result_valid_and_declined,
    api_push_result_valid_and_accepted
}
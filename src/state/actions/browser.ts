import { Guid } from "guid-typescript";

const browser_initial_state = (args: any) => ({
    id: Guid.create().toString(),
    type: "browser_initial_state",
    message: "We need to send a push notificaiton to your device to make sure it is really you",
    actions: [
        {
            text: "send push",
            triggers: [
                { action: "api_push_request_received", args: {...args }},
                { action: "browser_push_sent", args: {...args }},
            ]
        }
    ]
})

const browser_push_sent = (args: any) => ({
    id: Guid.create().toString(),
    type: "browser_push_sent",
    message: "We've sent a push notification to you!",
    args,
    actions: [
        {
            text: "send push",
            isDisabled: true,
            triggers: [
                { action: "browser_push_ask_resend", args: {...args }}
            ]
        }
    ]
})

const browser_push_ask_resend = (args: any) => ({
    id: Guid.create().toString(),
    type: "browser_push_ask_resend",
    message: "Did you not get the notification?",
    args, 
    actions: [
        {
            text: "resend push",
            isDisabled: false,
            triggers: [
                { action: "api_push_request_received", args: {...args }},
                { action: "browser_push_sent", args: {...args }}
            ]
        }
    ]
})

const browser_sign_in_success = (args: any) => ({
    id: Guid.create().toString(),
    type: "browser_sign_in_success",
    message: "Signin Successful!",
    args, 
    actions: []
})

const browser_sign_in_declined = (args: any) => ({
    id: Guid.create().toString(),
    type: "browser_sign_in_declined",
    message: "Sign in declined in mobile",
    args, 
    actions: []
})

export const browserActions = {
    browser_initial_state,
    browser_push_sent,
    browser_push_ask_resend,
    browser_sign_in_success,
    browser_sign_in_declined
}
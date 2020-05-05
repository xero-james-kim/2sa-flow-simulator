import { apiActions } from "./api";
import { mobileActions } from "./mobile";
import { browserActions } from './browser';
import { esActions } from './eventstore';

export type DomainActions = typeof actions
export const actions = {
    ...browserActions,
    ...apiActions,
    ...mobileActions,
    ...esActions
}

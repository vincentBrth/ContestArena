/**
 * Hold the user session data
 */
import { writable, type Writable } from 'svelte/store';
export type UserSession = {
    userUid: string;
    loggedIn: boolean;
    loading: boolean;
};

const session = <Writable<UserSession>>writable({});

export default {
    subscribe: session.subscribe,
    set: session.set,
    update: session.update,
}

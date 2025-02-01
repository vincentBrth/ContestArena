/**
 * Session store
 */
import { writable, type Writable } from 'svelte/store';
export type UserSession = {
    uid: string;
    email: string; //@TODO pourrais pas etre un watch sur le firebase ?
};

export type Session = {
    user: UserSession;
    loading: boolean;
}

const sessionStore = <Writable<Session>>writable({});

export default {
    subscribe: sessionStore.subscribe,
    set: sessionStore.set,
    update: sessionStore.update,
}

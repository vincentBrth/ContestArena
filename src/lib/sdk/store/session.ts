/**
 * Session store
 */
import { writable, type Writable } from 'svelte/store';
export type UserSession = {
    uid: string;
    email: string;
};

export type Session = {
    user: UserSession;
    initialized: boolean;
    loading: number;
}

const sessionStore = <Writable<Session>>writable({
    user: {
        uid: '',
        email: ''
    },
    initialized: false,
    loading: 0
});

export default {
    subscribe: sessionStore.subscribe,
    set: sessionStore.set,
    update: sessionStore.update,
}

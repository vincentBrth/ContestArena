import type { User } from '$lib/models/user';
import { auth } from '$lib/sdk/firebase/config';
import type { Session } from '$lib/sdk/store/session';
import session from '$lib/sdk/store/session';
import users from '$src/store/users';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue } from 'firebase/database';

export const prerender = true

export async function load({ url }) {
    // Auth
    onAuthStateChanged(auth, (user) => {
        const uid = user ? user.uid : '';
        const email = user && user.email ? user.email : '';
        session.update((cur: Session) => {
            return {
                ...cur,
                user: { uid: uid, email: email },
            };
        });
    });

    // Database
    onValue(users.dbRef, (snapshot) => {
        const data = snapshot.val();
        const usersMap = new Map<string, User>();
        if (data) {
            Object.keys(data).forEach((key) => {
                usersMap.set(key, { country: data[key].country, pseudo: data[key].pseudo, squads: data[key].squads, avatar: data[key].avatar });
            });
        }
        users.set(usersMap);
        session.update((cur: Session) => {
            return {
                ...cur,
                initialized: true,
            };
        });
    });

    return {
        url: url.pathname
    };
}

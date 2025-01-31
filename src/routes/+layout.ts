import { auth } from '$lib/sdk/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
export const prerender = true

export async function load({ url }) {
    /**
    *  Get the current authenticated user.
    */
    function getAuthUser() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => resolve(
                user ? user : null
            ));
        });
    }

    return {
        getAuthUser: getAuthUser,
        url: url.pathname
    };
}

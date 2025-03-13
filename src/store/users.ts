/**
 * /users in database
 */
import type { User } from '$lib/models/user';
import { database } from '$lib/sdk/firebase/config';
import { child, ref, set } from 'firebase/database';
import { writable, type Writable } from 'svelte/store';


const dbRef = ref(database, '/users/');
const users = <Writable<Map<string, User>>>writable(new Map());



function updateUser(uid: string, user: User) {
	set(child(dbRef, uid), user);
}

export default {
	subscribe: users.subscribe,
	updateUser: updateUser,
	set: users.set,
	dbRef: dbRef
};

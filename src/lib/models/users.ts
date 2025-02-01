/**
 * /users in Firebase
 */
import { database } from '$lib/sdk/firebase/config';
import { child, onValue, ref, set } from 'firebase/database';
import { writable, type Writable } from 'svelte/store';


export type UserInfo = {
	country: string;
	pseudo: string;
	squads: string[];
	avatar: string;
};

const dbRef = ref(database, '/users/');
const users = <Writable<Map<string, UserInfo>>>writable(new Map());

function watch() {
	onValue(dbRef, (snapshot) => {
		const data = snapshot.val();
		const usersMap = new Map<string, UserInfo>();
		if (data) {
			Object.keys(data).forEach((key) => {
				usersMap.set(key, { country: data[key].country, pseudo: data[key].pseudo, squads: data[key].squads, avatar: data[key].avatar });
			});
		}
		users.set(usersMap);
	});
}

function updateUserInfo(uid: string, user: UserInfo) {
	set(child(dbRef, uid), user);
}

export default {
	subscribe: users.subscribe,
	watch: watch,
	updateUserInfo: updateUserInfo,
};

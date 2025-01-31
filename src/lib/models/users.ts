/**
 * /users in Firebase
 */
import { database } from '$lib/sdk/firebase/firebase.config';
import { child, onValue, ref, set } from 'firebase/database';
import { writable, type Writable } from 'svelte/store';

export type UserInfo = {
	email: string;
	pseudo: string;
	avatar: string;
};

export type User = {
	info: UserInfo;
}

const dbRef = ref(database, '/users/');
const users = <Writable<Map<string, User>>>writable(new Map());

function watch() {
	onValue(dbRef, (snapshot) => {
		const data = snapshot.val();
		const usersMap = new Map<string, User>();
		if (data) {
			Object.keys(data).forEach((key) => {
				usersMap.set(key, data[key]);
			});
		}
		users.set(usersMap);
	});
}

function updateUserInfo(uid: string, user: UserInfo) {
	set(child(dbRef, `${uid}/info`), user);
}

export default {
	subscribe: users.subscribe,
	watch: watch,
	updateUserInfo: updateUserInfo,
};

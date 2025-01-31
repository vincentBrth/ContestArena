<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/sdk/firebase/firebase.config';
	import session  from '$lib/session';
	import { signOut } from 'firebase/auth';
	import { onMount } from 'svelte';
	onMount(() => {
		(async () => {
			await signOut(auth)
				.then(() => {
					session.set({
						userUid: '',
						loggedIn: false,
						loading: false
					});
				})
				.catch((error) => {
					return error;
				});
			goto('/');
		})();
	});
</script>

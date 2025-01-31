<script lang="ts">
	import Profile from '$lib/components/user/Profile.svelte';

	import { goto } from '$app/navigation';
	import { LoginRoute } from '$lib/route';
	import usersStore from '$lib/models/users';
	import session from '$lib/session';
	import { onMount } from 'svelte';
	onMount(async () => {
		if (!$session.loggedIn) {
			goto(LoginRoute.path);
		}
	});

	$: user = $usersStore.get($session.userUid);
</script>

<div class="flex justify-center">
	<Profile {user} />
</div>

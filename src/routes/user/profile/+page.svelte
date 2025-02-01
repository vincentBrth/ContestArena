<script lang="ts">
	import Profile from '$lib/components/user/Profile.svelte';

	import { goto } from '$app/navigation';
	import { LoginRoute } from '$lib/route';
	import usersStore from '$lib/models/users';
	import session from '$lib/sdk/store/session';
	import { onMount } from 'svelte';
	onMount(async () => {
		if (!$session.user.uid) {
			goto(LoginRoute.path);
		}
	});

	$: user = $usersStore.get($session.user.uid);
</script>

<div class="flex justify-center">
	<Profile user={user} />
</div>

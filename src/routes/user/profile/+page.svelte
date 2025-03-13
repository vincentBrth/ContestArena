<script lang="ts">
	import Profile from '$lib/components/user/Profile.svelte';

	import { goto } from '$app/navigation';
	import { SigninRoute } from '$lib/route';
	import session from '$lib/sdk/store/session';
	import { onMount } from 'svelte';
	import usersStore from '../../../store/users';
	onMount(async () => {
		if (!$session.user.uid) {
			goto(SigninRoute.path);
		}
	});

	$: user = $usersStore.get($session.user.uid);
</script>

<div class="flex justify-center">
	{#if user}
		<Profile user={user} />
	{/if}
</div>

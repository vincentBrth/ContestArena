<script lang="ts">
	import { goto } from '$app/navigation';
	import Login from '$lib/components/user/Login.svelte';
	import { ProfileRoute } from '$lib/route';
	import session from '$lib/session';
	import { onMount } from 'svelte';

	onMount(async () => {
		if ($session.loggedIn) {
			goto(ProfileRoute.path);
		}
	});
</script>

<div class="flex justify-center">
	<div class="w-full max-w-lg">
		<Login />
	</div>
</div>

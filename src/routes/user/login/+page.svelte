<script lang="ts">
	import { goto } from '$app/navigation';
	import Login from '$lib/components/user/Login.svelte';
	import { ProfileRoute } from '$lib/route';
	import session from '$lib/sdk/store/session';
	import { onMount } from 'svelte';

	onMount(async () => {
		if ($session.user.uid) {
			goto(ProfileRoute.path);
		}
	});
</script>

<div class="flex justify-center">
	<div class="w-full max-w-lg">
		<Login />
	</div>
</div>

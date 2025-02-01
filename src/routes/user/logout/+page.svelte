<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { LoginRoute, LogoutRoute, ProfileRoute } from '$lib/route';
	import { logout } from '$lib/sdk/firebase/auth';
	import { onMount } from 'svelte';

	// Hooks
	onMount(async () => {
		await logout();
		handle();
	});

	// Methods
	function handle() {
		if ($page.url.pathname == ProfileRoute.path || $page.url.pathname == LogoutRoute.path) {
			goto(LoginRoute.path);
		}
	}
</script>

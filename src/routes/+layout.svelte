<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import users from '$lib/models/users';
	import session from '$lib/session';
	import { toasts } from '$lib/toast';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	onMount(async () => {
		users.watch();
		const user: any = await data.getAuthUser();
		const loggedIn = user != null;
		session.set({
			userUid: loggedIn ? user.uid : '',
			loggedIn,
			loading: false
		});
	});
	//@TODO loading
	$: user = $users.get($session.userUid);
</script>

{#if $session.loading == true || $session.loading == undefined}
	<div>Loading...</div>
{:else}
	<NavBar logged={$session.loggedIn} userInfo={user?.info} />
	<div class="container mx-auto my-auto p-3 z-0">
		<Toast
			toasts={$toasts}
			on:click={(event) => {
				toasts.remove(event.detail);
			}}
		/>
		<slot />
	</div>
{/if}

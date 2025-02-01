<script lang="ts">
	import { page } from '$app/stores';
	import Toast from '$lib/components/core/Notification.svelte';
	import NavBar from '$lib/components/nav/NavBar.svelte';
	import users from '$lib/models/users';
	import { notifications } from '$lib/sdk/store/notification';
	import session from '$lib/sdk/store/session';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	onMount(async () => {
		users.watch();
		const user: any = await data.getAuthUser();
		const logged = user != null;
		session.set({
			user: {
				uid: logged ? user.uid : '',
				email: logged ? user.email : '',
			},
			loading: false
		});
	});

	// Data
	export let data: LayoutData;

	// Computed
	$: title =
		$page.url.pathname
			.split('/')
			.filter((segment) => segment !== '')
			.pop() || 'Contest Arena';
</script>

{#if $session.loading == true || $session.loading == undefined}
	<div>Loading...</div>
{:else}
	<NavBar user={$users.get($session.user.uid)} {title} />
	<div class="container mx-auto my-auto p-3 z-0">
		<Toast
			notifications={$notifications}
			on:click={(event) => {
				notifications.remove(event.detail);
			}}
		/>
		<slot />
	</div>
{/if}

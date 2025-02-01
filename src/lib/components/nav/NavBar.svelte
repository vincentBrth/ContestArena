<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import UserMenu from '$lib/components/user/Menu.svelte';
	import type { UserInfo } from '$lib/models/users';
	import { HomeRoute } from '$lib/route';

	// Data
	export let user: UserInfo | undefined;
	export let title: String;
</script>

<nav class="flex items-center bg-neutral-lightest p-2 justify-between z-50">
	<button
		class="material-symbols-outlined text-paris-darkest bg-transparent"
		on:click={() => {
			goto(HomeRoute.path);
		}}
	>
		{#if $page.url.pathname != HomeRoute.path}
			{HomeRoute.icon}
		{/if}
	</button>
	<div class="flex p-2 text-xl capitalize">
		{title}
	</div>
	<div class="flex">
		<UserMenu user={user} />
	</div>
</nav>

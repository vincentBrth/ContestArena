<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Menu from '$lib/components/nav/Menu.svelte';
	import type { User } from '$lib/models/user';
	import { HomeRoute } from '$lib/route';

	// Data
	export let user: User | undefined;
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
		<Menu {user} />
	</div>
</nav>

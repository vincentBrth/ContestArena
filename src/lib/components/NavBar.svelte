<script lang="ts">
	import UserMenu from '$lib/components/user/Menu.svelte';
	import type { UserInfo } from '$lib/models/users';
	import { NavigationRoutes } from '$lib/route';
	import { generateAvatar } from '$lib/sdk/firebase/auth';

	export let logged: boolean = false;
	export let userInfo: UserInfo = {
		email: 'anonymous@mail.com',
		pseudo: 'Anonymous',
		avatar: generateAvatar('anonymous')
	};
	let showMenu: boolean = false;
</script>

<nav class="flex items-center bg-black p-4 justify-between z-50">
	<a href="/"><img src="/logo.png" class="logo h-10" alt="logo" /></a>
	<div class="flex">
		{#each NavigationRoutes as route}
			<a href={route.path} class="text-white px-4">{route.name}</a>
		{/each}
	</div>

	<button
		class="material-icons bg-transparent text-white"
		on:click={() => {
			showMenu = !showMenu;
		}}
	>
		{#if logged}
			<img src={userInfo.avatar} alt="profile_image" class="rounded-full font-bold w-6 h-6" />
		{:else}
			account_circle
		{/if}
	</button>
	{#if showMenu}
		<div class="absolute right-4 top-20">
			<UserMenu
				{logged}
				{userInfo}
				on:click={() => {
					showMenu = !showMenu;
				}}
			/>
		</div>
	{/if}
</nav>

<style>
	.logo {
		font-weight: bold;
	}
</style>

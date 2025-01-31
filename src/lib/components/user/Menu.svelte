<script lang="ts">
	import { LoginRoute, LogoutRoute, ProfileRoute, RegisterRoute } from '$lib/route';

	import type { UserInfo } from '$lib/models/users';
	import { generateAvatar } from '$lib/sdk/firebase/auth';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let logged: boolean = false;
	export let userInfo: UserInfo = {
		email: 'anonymous@mail.com',
		pseudo: 'Anonymous',
		avatar: generateAvatar('anonymous')
	};

	function handle() {
		dispatch('click');
	}
</script>

<section class="relative flex flex-col z-50 p-4 min-w-52 gap-2">
	{#if logged}
		<div class="flex justify-center items-center bg-black rounded gap-2 mb-2 py-2 px-4">
			<img src={userInfo.avatar} alt="profile_image" class="rounded-full font-bold w-10 h-10" />
			@{userInfo.pseudo}
		</div>
	{/if}

	<ul role="menu" class="flex flex-col gap-2">
		{#if logged}
			<a href={ProfileRoute.path} on:click={handle}>
				<div class="flex">
					<span class="material-icons bg-transparent">{ProfileRoute.icon}</span>
					<span class="ml-2">{ProfileRoute.name}</span>
				</div>
			</a>

			<hr class="my-2 border-neutral-500" tabindex="-1" />
			<a href={LogoutRoute.path} on:click={handle}>
				<div class="flex">
					<span class="material-icons bg-transparent">{LogoutRoute.icon}</span>
					<span class="ml-2">{LogoutRoute.name}</span>
				</div>
			</a>
		{:else}
			<a href={LoginRoute.path} on:click={handle}>
				<div class="flex">
					<span class="material-icons bg-transparent">{LoginRoute.icon}</span>
					<span class="ml-2">{LoginRoute.name}</span>
				</div>
			</a>
			<a href={RegisterRoute.path} on:click={handle}>
				<div class="flex">
					<span class="material-icons bg-transparent">{RegisterRoute.icon}</span>
					<span class="ml-2">{RegisterRoute.name}</span>
				</div>
			</a>
		{/if}
	</ul>
</section>

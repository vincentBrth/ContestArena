<script lang="ts">
	import { LoginRoute, LogoutRoute, ProfileRoute, RegisterRoute } from '$lib/route';

	import type { UserInfo } from '$lib/models/users';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// Data
	export let user: UserInfo | undefined;

	// Methods
	function handle() {
		dispatch('click');
	}
</script>

<section class="p-0 dropdown">
	<div>
		<button
			class="inline-flex bg-transparent material-symbols-outlined text-paris-darkest"
			aria-haspopup="true"
			aria-expanded="true"
		>
			account_circle
		</button>
	</div>
	<div
		class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right mr-2 -translate-y-2 scale-95 z-40"
	>
		<div
			class="absolute right-0 min-w-52 mt-2 origin-top-right pl-4 pr-4 gap-2 bg-white border border-gray-200 rounded-md shadow-lg outline-none divide-y divide-gray-100"
		>
			{#if user}
				<div class="flex justify-center items-center rounded gap-2 my-2 py-2 px-4">
					<img src={user.avatar} alt="profile_image" class="rounded-full font-bold w-10 h-10" />
					@{user.pseudo}
				</div>
			{/if}

			<ul role="menu" class="flex flex-col py-3 gap-2">
				{#if user}
					<a href={ProfileRoute.path} on:click={handle}>
						<div class="flex">
							<span class="material-icons bg-transparent">{ProfileRoute.icon}</span>
							<span class="ml-2">{ProfileRoute.name}</span>
						</div>
					</a>

					<hr class="my-2 border-neutral-400" tabindex="-1" />
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
		</div>
	</div>
</section>

<style scoped>
	.dropdown:focus-within .dropdown-menu {
		opacity: 1;
		transform: translate(0) scale(1);
		visibility: visible;
	}
</style>

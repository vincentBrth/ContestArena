<script lang="ts">
	import { goto } from '$app/navigation';
	import Switch from '$lib/components/core/TabSwitch.svelte';
	import Login from '$lib/components/user/Login.svelte';
	import Register from '$lib/components/user/Register.svelte';
	import { ProfileRoute } from '$lib/route';
	import session from '$lib/sdk/store/session';
	import { Tabs } from '$lib/sdk/util/tab';
	import { onMount } from 'svelte';

	// Internal
	const tabs = new Tabs(
		[
			{ label: 'Login', value: 'login', disabled: false, hidden: false },
			{ label: 'Register', value: 'register', disabled: false, hidden: false }
		],
		'login'
	);

	// Functions
	onMount(async () => {
		if ($session.user.uid) {
			goto(ProfileRoute.path);
		}
	});
</script>

<div class="flex justify-center">
	<div class="w-full max-w-lg">
		<div class="flex justify-center px-6 py-2">
			<Switch
				{tabs}
				on:model={(event) => {
					tabs.selectedTab = event.detail;
				}}
			/>
		</div>
		<div>
			{#if tabs.selectedTab.value === 'register'}
				<Register />
			{:else}
				<Login />
			{/if}
		</div>
	</div>
</div>

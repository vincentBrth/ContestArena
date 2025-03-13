<script lang="ts">
	import { page } from '$app/stores';
	import Error from '$lib/components/nav/Error.svelte';
	import { default as pageStore } from '$lib/sdk/store/page';
	import users from '$src/store/users';

	// Computed
	$: user = $users.get($page.params.id);
	$: pageStore.set({
		title: $page.status == 200 ? (user ? `@${user.pseudo}` : 'Not Found') : $page.status.toString()
	});
</script>

<div class="w-full text-center">
	{#if user}
		<img
			src={user.avatar}
			alt="avatar"
			class="w-24 h-24 rounded-full mx-auto my-4 bg-white border border-black"
		/>
		{user.pseudo}
	{:else}
		<Error code={404} message="User '{$page.params.id}' not found" />
	{/if}
</div>

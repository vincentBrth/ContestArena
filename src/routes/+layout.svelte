<script lang="ts">
	import { page } from '$app/stores';
	import Toast from '$lib/components/core/Notification.svelte';
	import Error from '$lib/components/nav/Error.svelte';
	import Loader from '$lib/components/nav/Loader.svelte';
	import NavBar from '$lib/components/nav/NavBar.svelte';
	import { notifications } from '$lib/sdk/store/notification';
	import { default as pageStore, type PageInfo } from '$lib/sdk/store/page';
	import session from '$lib/sdk/store/session';
	import { HomeRoute, NavigationRoutes } from '$src/lib/route';
	import '../app.css';
	import users from '../store/users';

	// Data
	$: pageStore.update((cur: PageInfo) => {
		if ($page.route.id?.endsWith('/[id]')) {
			return {
				...cur
			};
		}
		return {
			...cur,
			title: ($page.status == 200
				? $page.params?.id
					? $page.params.id
					: (
							NavigationRoutes.find((route) => route.path == $page.url.pathname)?.title ??
							$page.url.pathname
								.split('/')
								.filter((segment) => segment !== '')
								.pop() ??
							''
						).replaceAll('_', ' ')
				: $page.status.toString()
			)
				.split('_')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')
		};
	});

	// Computed
	$: fullTitle =
		$pageStore.title == HomeRoute.title
			? HomeRoute.title
			: `${HomeRoute.title} | ${$pageStore.title}`;
</script>

<svelte:head>
	<title>{fullTitle}</title>
</svelte:head>

{#if !$session.initialized || $session.loading > 0}
	<Loader type="dots" />
{:else if $page.status != 200}
	<Error code={$page.status} message={$page.error?.message ?? ''} />
{:else}
	<NavBar user={$users.get($session.user.uid)} title={$pageStore.title} />
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

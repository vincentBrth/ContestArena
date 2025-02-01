<script lang="ts">
	import type { Notification } from '$lib/sdk/store/notification';
	import { NotificationType } from '$lib/sdk/store/notification';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	// Internal
	const themes = {
		[NotificationType.DEFAULT]: '#aaaaaa',
		[NotificationType.INFO]: '#5bc0de',
		[NotificationType.SUCCESS]: '#84c991',
		[NotificationType.WARNING]: '#f0ad4e',
		[NotificationType.ERROR]: '#e26d69',
		[NotificationType.CRITICAL]: '#a94442'
	};

	// Data
	export let notifications: Notification[] = [];

	// Methods
	const dispatch = createEventDispatcher();
	function getThemeColor(type: NotificationType): string {
		return themes[type as keyof typeof themes] || themes[NotificationType.DEFAULT];
	}
</script>

<div class="notifications">
	{#each notifications as notification (notification.id)}
		<div
			animate:flip
			class="notification"
			style="background: {getThemeColor(notification.type)};"
			transition:fly={{ y: 100 }}
		>
			<span class="flex w-fit max-w-sm">
				<span class="flex first-letter:capitalize text-center text-sm w-fit max-w-sm py-2 px-3"
					>{notification.message}
				</span>
				<button
					class="text-sm py-2 px-3 bg-[#0505051e] opacity-95 rounded-none"
					on:click={() => {
						dispatch('click', notification.id);
					}}
				>
					x
				</button>
			</span>
		</div>
	{/each}
</div>

<style>
	.notifications {
		position: fixed;
		bottom: 10px;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.notification {
		flex: 0 0 auto;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}
</style>

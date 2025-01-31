<script lang="ts">
	import type { Toast } from '$lib/toast';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	export let themes = {
		default: '#aaaaaa',
		info: '#5bc0de',
		success: '#84c991',
		warning: '#f0ad4e',
		error: '#e26d69',
		critical: '#a94442'
	};

	const dispatch = createEventDispatcher();
	export let toasts: Toast[] = [];
</script>

<div class="toasts">
	{#each toasts as toast (toast.id)}
		<div
			animate:flip
			class="toast"
			style="background: {themes[toast.type]};"
			transition:fly={{ y: 100 }}
		>
			<span class="flex w-fit max-w-sm">
				<span class="flex first-letter:capitalize text-center text-sm w-fit max-w-sm py-2 px-3"
					>{toast.message}
				</span>
				<button
					class="text-sm py-2 px-3 bg-[#0505051e] opacity-95"
					on:click={() => {
						dispatch('click', toast.id);
					}}
				>
					x
				</button>
			</span>
		</div>
	{/each}
</div>

<style>
	.toasts {
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

	.toast {
		flex: 0 0 auto;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}
</style>

<script lang="ts">
	import type { Tab } from '$lib/sdk/util/tab';
	import { Tabs } from '$lib/sdk/util/tab';
	import { createEventDispatcher } from 'svelte';

	// Data
	export let tabs: Tabs;

	// Dispatch
	const dispatch = createEventDispatcher<{model : Tab}>();

	// Functions
	function handle(tab: Tab) {
		dispatch('model', tab);
	}
</script>

<div class="flex-wrap overflow-x-auto">
	<ul class="flex">
		{#each tabs.tabs as tab, index}
			{#if !tab.hidden}
				<li>
					<input
						type="radio"
						name={tabs.tabGroup}
						id={tab.value}
						class="peer w-full hidden"
						disabled={tab.disabled}
						value={tab.value}
						checked={tab === tabs.selectedTab}
						on:input={() => {
							handle(tab);
						}}
					/>
					<label
						for={tab.value}
						class="block px-2 min-w-fit w-20 text-center select-none leading-10 h-full first-letter:capitalize text-white cursor-pointer disabled:cursor-not-allowed {index ===
						0
							? 'rounded-l-full'
							: ''} {index === tabs.tabs.length - 1 ? 'rounded-r-full' : ''}
              {tab === tabs.selectedTab
							? 'bg-neutral-darkest'
							: tab.disabled
								? 'bg-gray-200'
								: 'bg-neutral'}"
					>
						{tab.label}
					</label>
				</li>
			{/if}
		{/each}
	</ul>
</div>

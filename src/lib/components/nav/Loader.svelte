<script lang="ts">
	// Data
	export let type: string = 'dots';
</script>

<section class="block fixed inset-x-0 top-28 z-0">
	{#if type == 'dots'}
		<div class="flex items-center justify-center space-x-2 animate-bounce">
			<div class="w-8 h-8 bg-neutral rounded-full"></div>
			<div class="w-8 h-8 bg-neutral-dark rounded-full"></div>
			<div class="w-8 h-8 bg-neutral-darkest rounded-full"></div>
		</div>
	{:else if type == 'spinner'}
		<div class="flex items-center justify-center">
			<div
				class="w-40 h-40 border-t-4 border-b-4 border-neutral-dark rounded-full animate-spin"
			></div>
		</div>
	{:else if type == 'dots-fade'}
		<div class="flex items-center justify-center space-x-2 animate-pulse">
			<div class="w-8 h-8 bg-neutral rounded-full"></div>
			<div class="w-8 h-8 bg-neutral-dark rounded-full"></div>
			<div class="w-8 h-8 bg-neutral-darkest rounded-full"></div>
		</div>
	{:else if type == 'star'}
		<div class="flex items-center justify-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-24 h-24 text-neutral-dark animate-spin"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
				/>
			</svg>
		</div>
	{:else if type == 'spinner-0'}
		<div>
			<div
				style="border-top-color: transparent"
				class="w-16 h-16 border-4 border-neutral-dark border-solid rounded-full animate-spin"
			></div>
		</div>
	{:else if type == 'spinner-1'}
		<div>
			<div
				style="border-top-color: transparent"
				class="w-16 h-16 border-4 border-neutral-dark border-dashed rounded-full animate-spin"
			></div>
		</div>
	{:else if type == 'spinner-2'}
		<div>
			<div
				style="border-top-color: transparent"
				class="w-16 h-16 border-4 border-neutral-dark border-dotted rounded-full animate-spin"
			></div>
		</div>
	{:else}
		<div>
			<div
				style="border-top-color: transparent"
				class="w-16 h-16 border-4 border-neutral-dark border-double rounded-full animate-spin"
			></div>
		</div>
	{/if}
</section>

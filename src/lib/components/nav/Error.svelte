<script lang="ts">
	import { goto } from '$app/navigation';
	import { HomeRoute } from '$lib/route';

	// Data
	export let code: number;
	export let message: string;
</script>

<div>
	<span class="material-symbols-outlined text-center w-full text-9xl">
		sentiment_very_dissatisfied
	</span>
	<div class="w-full text-center">
		<div>{code} - {message}</div>
		<div>
			<a href={HomeRoute.path} on:click|preventDefault={() => goto(HomeRoute.path)}>Back to home</a>
		</div>
	</div>
</div>

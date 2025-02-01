<script lang="ts">
	import { ResrictedString } from '$lib/sdk/util/restricted';
	import type { Theme } from '$lib/models/theme';
	import { LightTheme } from '$lib/models/theme';
	import { createEventDispatcher } from 'svelte';

	// Data
	export let type: string = 'text';
	export let label: string = 'label';
	export let theme: Theme = LightTheme;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let model: ResrictedString

	// Internal
	let showPassword: boolean = false;
	let errorMessage: string = '';

	// Dispatch
	const dispatch = createEventDispatcher();

	// Functions
	function handle(event: Event) {
		dispatch('model', { model: (event.target as HTMLInputElement).value });
		errorMessage = '';
		if (type == 'email') {
			if ((event.target as HTMLInputElement).validity.typeMismatch) {
				errorMessage = 'Please provide a valid email address';
			}
		} else if ((event.target as HTMLInputElement).validity.tooShort) {
			errorMessage = `Input must contain at least ${model.minLength} characters`;
		} else if ((event.target as HTMLInputElement).validity.tooLong) {
			errorMessage = `Input must contain at most ${model.maxLength} characters`;
		} else if ((event.target as HTMLInputElement).validity.patternMismatch) {
			errorMessage = 'Invalid input pattern';
		} else if ((event.target as HTMLInputElement).validity.rangeOverflow) {
			errorMessage = 'Input value is too high';
		} else if ((event.target as HTMLInputElement).validity.rangeUnderflow) {
			errorMessage = 'Input value is too low';
		} else if ((event.target as HTMLInputElement).validity.stepMismatch) {
			errorMessage = 'Invalid step value';
		}
	}
</script>

<div class="relative z-100 my-2">
	<input
		{type}
		placeholder=""
		{required}
		{disabled}
		minlength={model.minLength}
		maxlength={model.maxLength}
		value={model.value}
		on:input={(event) => {
			handle(event);
		}}
		class="{theme.border} focus:border-transparent disabled:bg-gray-300"
	/>
	<i class="first-letter:uppercase text-xs font-normal -top-2 {theme.background} "
		>{label}<span class="text-red-600">{required && !disabled ? '*' : ''}</span></i
	>
	{#if type == 'password' || showPassword == true}
		<button
			type="button"
			class="material-icons bg-transparent absolute top-1 right-1 {theme.text}"
			on:click={() => {
				showPassword = !showPassword;
				if (showPassword) {
					type = 'text';
				} else {
					type = 'password';
				}
			}}
		>
			{#if showPassword}
				visibility
			{:else}
				visibility_off
			{/if}
		</button>
	{/if}
	<div class="text-red-600 text-xs">
		{#if errorMessage}
			<p>{errorMessage}</p>
		{:else}
			<p>&nbsp;</p>
		{/if}
	</div>
</div>

<style>
	i {
		position: absolute;
		left: 0;
		margin-left: 14px;
		padding-left: 8px;
		padding-right: 8px;
		font-style: normal;
		transition: 0.5s;
		pointer-events: none;
	}
</style>

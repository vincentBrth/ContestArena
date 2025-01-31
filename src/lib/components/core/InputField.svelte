<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: string = 'text';
	export let label: string = 'label';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let minLength: number = 0;
	export let maxLength: number = 64;

	export let model: string = '';
	let showPassword: boolean = false;
	let errorMessage: string = '';

	const dispatch = createEventDispatcher();

	function handle(event: Event) {
		dispatch('model', { model: (event.target as HTMLInputElement).value });
		errorMessage = '';
		if (type == 'email') {
			if ((event.target as HTMLInputElement).validity.typeMismatch) {
				errorMessage = 'Please provide a valid email address';
			}
		} else if ((event.target as HTMLInputElement).validity.tooShort) {
			errorMessage = `Input must contain at least ${minLength} characters`;
		} else if ((event.target as HTMLInputElement).validity.tooLong) {
			errorMessage = `Input must contain at most ${maxLength} characters`;
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

<div class="relative z-100">
	<input
		{type}
		placeholder=""
		{required}
		{disabled}
		minlength={minLength}
		maxlength={maxLength}
		value={model}
		on:input={(event) => {
			handle(event);
		}}
	/>
	<i class="first-letter:uppercase"
		>{label}<span class="text-red-300">{required && !disabled ? '*' : ''}</span></i
	>
	{#if type == 'password' || showPassword == true}
		<button
			type="button"
			class="material-icons bg-transparent absolute top-2 right-1"
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
	<div class="text-red-300 text-xs">
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
		padding: 15px 10px;
		font-style: normal;
		color: #aaa;
		transition: 0.5s;
		pointer-events: none;
	}

	input:not(:placeholder-shown) ~ i,
	input:focus ~ i {
		transform: translateY(-7.5px);
		font-size: 0.8em;
	}

	input:not(:placeholder-shown):invalid {
		border: none;
		outline: 1px solid #f48f91;
	}

	input:disabled {
		background-color: #1d1c1c;
	}
</style>

<script lang="ts">
	import InputField from '$lib/components/core/InputField.svelte';
	import { RegisterRoute } from '$lib/route';
	import { resetPassword } from '$lib/sdk/firebase/auth';

	let email: string = 'vincent.berthet42@gmail.com';
</script>

<section>
	<div class="flex flex-col relative gap-3">
		<h2 class="uppercase text-3xl text-center mb-4">Reset</h2>
		<form
			on:submit|preventDefault={async () => {
				await resetPassword(email);
			}}
			class="flex flex-col gap-3"
		>
			<InputField
				label="email"
				type="email"
				required={true}
				model={email}
				on:model={(event) => {
					email = event.detail.model;
				}}
			/>

			<div class="text-xs flex justify-between pt-6">
				<a href={RegisterRoute.path}>{RegisterRoute.description}</a>
			</div>
			<input type="submit" value="Reset" />
		</form>
	</div>
</section>

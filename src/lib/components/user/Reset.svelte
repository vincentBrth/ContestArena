<script lang="ts">
	import InputField from '$lib/components/core/InputField.svelte';
	import { RestrictedEmail } from '$lib/sdk/util/restricted';
	import { RegisterRoute } from '$lib/route';
	import { resetPassword } from '$lib/sdk/firebase/auth';

	let email: RestrictedEmail = new RestrictedEmail('vincent.berthet42@gmail.com');
</script>

<section>
	<div class="flex flex-col relative gap-3">
		<form
			on:submit|preventDefault={async () => {
				await resetPassword(email.value);
			}}
			class="flex flex-col gap-3"
		>
			<InputField
				label="email"
				type="email"
				required={true}
				model={email}
				on:model={(event) => {
					email.value = event.detail.model;
				}}
			/>

			<div class="text-xs flex justify-between pt-6">
				<a href={RegisterRoute.path}>{RegisterRoute.description}</a>
			</div>
			<input type="submit" value="Reset" />
		</form>
	</div>
</section>

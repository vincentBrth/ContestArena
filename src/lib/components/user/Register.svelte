<script lang="ts">
	import InputField from '$lib/components/core/InputField.svelte';
	import { LoginRoute } from '$lib/route';
	import { register } from '$lib/sdk/firebase/auth';

	let email: string = 'vincent.berthet42@gmail.com';
	let pseudo: string = 'Sissou';
	let password: string = 'sissou';
</script>

<section>
	<div class="flex flex-col gap-3">
		<h2 class="uppercase text-3xl text-center mb-4">Register</h2>
		<form
			on:submit|preventDefault={async () => {
				await register(email, password, pseudo);
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
			<InputField
				label="pseudo"
				type="text"
				required={true}
				model={pseudo}
				minLength={3}
				on:model={(event) => {
					pseudo = event.detail.model;
				}}
			/>
			<InputField
				label="Password"
				type="password"
				required={true}
				model={password}
				minLength={6}
				on:model={(event) => {
					password = event.detail.model;
				}}
			/>
			<div class="text-xs flex justify-between pt-6">
				<a href={LoginRoute.path}>{LoginRoute.description}</a>
			</div>
			<input type="submit" value="Register" />
		</form>
	</div>
</section>

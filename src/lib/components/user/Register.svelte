<script lang="ts">
	import { goto } from '$app/navigation';
	import InputField from '$lib/components/core/InputField.svelte';
	import type { User } from '$lib/models/user';
	import { SigninRoute } from '$lib/route';
	import { register } from '$lib/sdk/firebase/auth';
	import { generateAvatar } from '$lib/sdk/util/avatar';
	import { ResrictedString, RestrictedEmail } from '$lib/sdk/util/restricted';
	import users from '../../../store/users';

	// Internal
	let email: RestrictedEmail = new RestrictedEmail();
	let pseudo: ResrictedString = new ResrictedString('', 3, 32);
	let password: ResrictedString = new ResrictedString();

	// Computed
	$: canRegister = !(email.valid() && pseudo.valid() && password.valid());

	// Methods
	const registerUser = async () => {
		const registered = await register(email.value, password.value);
		if (registered) {
			const user: User = {
				country: '',
				pseudo: pseudo.value,
				squads: [],
				avatar: generateAvatar(pseudo.value)
			};
			users.updateUser(registered.user.uid, user);
			goto(SigninRoute.path);
		}
	};
</script>

<section>
	<div class="flex flex-col gap-3">
		<form on:submit|preventDefault={registerUser} class="flex flex-col gap-3">
			<InputField
				label="email"
				type="email"
				required={true}
				model={email}
				on:model={(event) => {
					email.value = event.detail.model;
				}}
			/>
			<InputField
				label="pseudo"
				type="text"
				required={true}
				model={pseudo}
				on:model={(event) => {
					pseudo.value = event.detail.model;
				}}
			/>
			<InputField
				label="Password"
				type="password"
				required={true}
				model={password}
				on:model={(event) => {
					password.value = event.detail.model;
				}}
			/>
			<input type="submit" value="Register" disabled={canRegister} />
		</form>
	</div>
</section>

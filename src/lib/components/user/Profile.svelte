<script lang="ts">
	import InputField from '$lib/components/core/InputField.svelte';
	import type { UserInfo } from '$lib/models/users';
	import users from '$lib/models/users';
	import { notifications } from '$lib/sdk/store/notification';
	import session from '$lib/sdk/store/session';
	import { ResrictedString, RestrictedEmail } from '$lib/sdk/util/restricted';
	import { getAuth, updatePassword } from 'firebase/auth';

	// Data
	export let user: UserInfo | undefined;

	// Internal
	let editing: boolean = false;
	let country: string = ''; //@TODO selector
	let pseudo: ResrictedString = new ResrictedString();
	let squads: string[] = []; // @TODO
	let password: ResrictedString = new ResrictedString('', 3, 32);
	let avatar: string = '';

	// Computed
	$: updated_profile = {
		country: country,
		pseudo: pseudo.value,
		squads: squads,
		avatar: avatar
	} as UserInfo;

	$: canBeUpdated = password.valid() || (pseudo.valid() && pseudo.value !== user?.pseudo);

	// Methods
	function handleImageLoad(event: any) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (loadEvent: any) {
				avatar = loadEvent.target.result;
			};
			reader.readAsDataURL(file);
		}
	}

	async function update_user_profile() {
		$session.loading = true;
		try {
			users.updateUserInfo($session.user.uid, updated_profile);
			if (password.value.length > 0) {
				const auth = getAuth();
				if (auth.currentUser) {
					await updatePassword(auth.currentUser, password.value);
				}
			}
			notifications.success('Profile updated');
		} catch (error: any) {
			notifications.error(error);
		}
		editing = !editing;
		$session.loading = false;
	}
</script>

<section class="max-w-lg">
	{#if user == undefined}
		<!-- @TODO error panel  -->
	{:else}
		<div>
			{#if !editing}
				<div class="flex justify-end">
					<button
						class="material-icons"
						on:click={() => {
							editing = !editing;
							pseudo.value = user.pseudo;
							avatar = user.avatar;
							password.value = '';
						}}>edit</button
					>
				</div>
				<img src={user.avatar} alt="avatar" class="w-24 h-24 rounded-full mx-auto my-4 bg-white border border-black" />
				<div>
					<InputField
						label="email"
						disabled={true}
						model={new RestrictedEmail($session.user.email)}
					/>
					<InputField label="pseudo" disabled={true} model={new ResrictedString(user.pseudo)} />
				</div>
			{:else}
				<form on:submit|preventDefault={update_user_profile}>
					<div>
						<div class="flex flex-col items-center pb-8">
							<img src={avatar} class="w-24 h-24 rounded-full mx-auto my-4 bg-white border border-black" alt="image_preloaded" />
							<input type="file" accept="image/*" on:change={handleImageLoad} />
						</div>
						<InputField
							label="email"
							disabled={true}
							model={new RestrictedEmail($session.user.email)}
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
							label="password"
							type="password"
							required={false}
							model={password}
							on:model={(event) => {
								password.value = event.detail.model;
							}}
						/>
					</div>
					<div class="flex flex-col justify-center gap-3">
						<button type="submit" class="w-full" disabled={!canBeUpdated}> Update </button>
						<button
							class="w-full"
							on:click={() => {
								editing = !editing;
							}}
						>
							Cancel
						</button>
					</div>
				</form>
			{/if}
		</div>
	{/if}
</section>

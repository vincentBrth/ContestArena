<script lang="ts">
	import InputField from '$lib/components/core/InputField.svelte';
	import type { User } from '$lib/models/users';
	import users from '$lib/models/users';
	import session from '$lib/session';
	import { toasts } from '$lib/toast';
	import { getAuth, updatePassword } from 'firebase/auth';

	export let user: User = {
		info: {
			email: 'anonymous@email.com',
			pseudo: 'anonymous',
			avatar: ''
		}
	};

	let editing: boolean = false;
	// edit
	let pseudo: string = '';
	let password: string = '';
	let avatar: string = '';

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
		users.updateUserInfo($session.userUid, updated_profile);
		if (password.length > 0) {
			const auth = getAuth();
			if (auth.currentUser) {
				await updatePassword(auth.currentUser, password);
			}
		}
		toasts.success('Profile updated');
		editing = !editing;
		$session.loading = false;
	}

	$: updated_profile = { email: user.info.email, pseudo: pseudo, avatar: avatar };
	$: can_be_updated =
		password.length >= 6 ||
		(pseudo.length >= 3 &&
			JSON.stringify(updated_profile, Object.keys(updated_profile).sort()) !=
				JSON.stringify(user.info, Object.keys(user.info).sort()));
</script>

<section class="max-w-lg">
	<h2 class="uppercase text-3xl text-center mb-4">Profile</h2>
	<div>
		{#if !editing}
			<div class="flex justify-end">
				<button
					class="material-icons"
					on:click={() => {
						editing = !editing;
						pseudo = user.info.pseudo;
						avatar = user.info.avatar;
						password = '';
					}}>edit</button
				>
			</div>
			<img src={user.info.avatar} alt="avatar" class="w-24 h-24 rounded-full mx-auto my-4" />
			<div>
				<InputField label="email" disabled={true} model={user.info.email} />
				<InputField label="pseudo" disabled={true} model={user.info.pseudo} />
			</div>
		{:else}
			<form on:submit|preventDefault={update_user_profile} class="space-y-6">
				<div>
					<input type="file" accept="image/*" on:change={handleImageLoad} />
					<img src={avatar} class="w-24 h-24 rounded-full" alt="image_preloaded" />
					<InputField label="email" disabled={true} model={user.info.email} />
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
						label="password"
						type="password"
						required={false}
						model={password}
						minLength={6}
						on:model={(event) => {
							password = event.detail.model;
						}}
					/>
				</div>
				<!--
			</div> @TODO-->
				<!-- <div>
			<label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
			<textarea
				name="bio"
				id="bio"
				rows="4"
				class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			></textarea>
		</div> -->
				<div class="flex flex-col justify-center gap-3">
					<button type="submit" class="w-full" disabled={!can_be_updated}> Update </button>
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
</section>

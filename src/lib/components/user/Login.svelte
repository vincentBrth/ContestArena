<script lang="ts">
	import { goto } from '$app/navigation';
	import InputField from '$lib/components/core/InputField.svelte';
	import { ProfileRoute, RegisterRoute, ResetRoute } from '$lib/route';
	import { loginWithMail, signInWithGoogle } from '$lib/sdk/firebase/auth';
	let email: string = 'vincent.berthet42@gmail.com';
	let password: string = 'sissou';
</script>

<section>
	<div class="flex flex-col gap-3">
		<h2 class="uppercase text-3xl text-center mb-4">Sign In</h2>
		<div class="flex justify-center">
			<button
				type="button"
				class=" bg-[#4285F4] text-white rounded-lg px-5 inline-flex items-center justify-center w-fit"
				on:click={async () => {
					const signed = await signInWithGoogle(email);
					if (signed == true) {
						goto(ProfileRoute.path);
					}
				}}
			>
				<svg
					class="w-4 h-4 mr-2 -ml-1"
					data-prefix="fab"
					data-icon="google"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 488 512"
				>
					<path
						fill="currentColor"
						d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
					>
					</path>
				</svg>
				Sign in with Google
			</button>
		</div>
		<div
			class="flex items-center before:flex-1 before:border-t before:border-neutral-500 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-500"
		>
			<p class="mx-4 text-center text-neutral-400">or</p>
		</div>
		<form
			on:submit|preventDefault={async () => {
				const signed = await await loginWithMail(email, password);
				if (signed == true) {
					goto(ProfileRoute.path);
				}
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
				<a href={ResetRoute.path}>{ResetRoute.description}</a>
				<a href={RegisterRoute.path}>{RegisterRoute.description}</a>
			</div>
			<input type="submit" value="Login" />
		</form>
	</div>
</section>

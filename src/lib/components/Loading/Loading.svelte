<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL, PUBLIC_BASIC_TOKEN } from '$env/static/public';
	import { appConfigsStore, loadingStore } from '$lib/stores/configs';
	import { rosaryDataStore } from '$lib/stores/rosaries';
	import { tokenStore } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import Spinner from './Spinner.svelte';

	onMount(async () => {
		let token;
		const configRes = await fetch(
			`${PUBLIC_BACKEND_URL}/api/v1/configs/getConfigByCode/FRONTEND_CONFIG`
		);
		const configData = await configRes.json();

		const rosaryConfigRes = await fetch(
			`${PUBLIC_BACKEND_URL}/api/v1/configs/getConfigByCode/ROSARY_CONFIG`
		);
		const rosaryConfigData = await rosaryConfigRes.json();

		const authRes = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/auth/thirdparty/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${PUBLIC_BASIC_TOKEN}`
			},
			body: JSON.stringify({
				username: $page.data.telegramUserInfo.username,
				password: String($page.data.telegramUserInfo.id),
				deviceId: $page.data.deviceId
			})
		});
		const authData = await authRes.json();

		if (authData.ok) {
			token = authData.data.access_token as string;
			localStorage.setItem('token', token);
			tokenStore.set(token);
		}

		const rosaryRes = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/rosaries/today`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		const rosaryData = await rosaryRes.json();

		rosaryDataStore.set(rosaryData.data);

		appConfigsStore.set({
			ROSARY_CONFIG: rosaryConfigData.data,
			FRONTEND_CONFIG: configData.data
		});

		loadingStore.set(false);
	});
</script>

<div class="flex h-screen w-full items-center justify-center">
	<Spinner />
</div>

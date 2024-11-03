<script>
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { createNewPrayerStore, rosaryDataStore } from '$lib/stores/rosaries';
	const lang = $page.data.lang;
	const { LANG } = $page.data.FRONTEND_CONFIG.subConfigs;
	const { PRAYER_TYPES, ROSARY_TYPES } = $page.data.ROSARY_CONFIG.value;

	const createPrayer = {
		rosaryId: $rosaryDataStore._id,
		rosary_metadata: undefined,
		prayer_metadata: undefined
	};

	let isLoading = false;
	const onSubmit = async () => {
		isLoading = true;
		const rosaryRes = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/rosaries/new-prayer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$page.data.token}`
			},
			body: JSON.stringify(createPrayer)
		});
		const data = await rosaryRes.json();
		if (data.ok) {
			rosaryDataStore.set(data.data);
			createNewPrayerStore.set(false);
		}
		isLoading = false;
	};
</script>

<div class="flex w-full flex-col items-center gap-5">
	{#if ROSARY_TYPES.display}
		<label class="form-control w-full max-w-xs">
			<select
				class="select select-bordered"
				required={ROSARY_TYPES.required}
				bind:value={createPrayer.rosary_metadata}
			>
				<option disabled selected value={undefined}>{ROSARY_TYPES.default.name[lang]}</option>
				{#each ROSARY_TYPES.options as rosary}
					<option value={rosary}>{rosary.name[lang]}</option>
				{/each}
			</select>
		</label>
	{/if}
	{#if PRAYER_TYPES.display}
		<label class="form-control w-full max-w-xs">
			<select
				class="select select-bordered"
				required={PRAYER_TYPES.required}
				bind:value={createPrayer.prayer_metadata}
			>
				<option disabled selected value={undefined}>{PRAYER_TYPES.default.name[lang]}</option>
				{#each PRAYER_TYPES.options as prayer}
					<option value={prayer}>{prayer.name[lang]}</option>
				{/each}
			</select>
		</label>
	{/if}

	<button class="btn btn-primary w-full max-w-xs" on:click={onSubmit} disabled={isLoading}
		>{LANG.BUTTON.START[lang]}</button
	>
</div>

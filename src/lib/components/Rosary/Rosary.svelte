<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { createNewPrayerStore, rosaryDataStore } from '$lib/stores/rosaries';
		const lang = $page.data.lang;
	const { LANG } = $page.data.FRONTEND_CONFIG.subConfigs;
	let isLoading = false;
	let currentIdx = $rosaryDataStore.prayers.length - 1;
	let lastDiff = 1;

	$: {
		currentIdx = $rosaryDataStore.prayers.length - 1;
	}

	const updateRosary = async (diff: number) => {
		isLoading = true;
		const rosaryRes = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/rosaries/update-prayer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$page.data.token}`
			},
			body: JSON.stringify({
				diff: diff,
				currentIdx: currentIdx,
				rosaryId: $rosaryDataStore._id
			})
		});
		const data = await rosaryRes.json();
		if (data.ok) {
			lastDiff = diff;
			rosaryDataStore.set(data.data);
		}
		isLoading = false;
	};
</script>

{#if isLoading}
	<span class="loading loading-ring w-[18rem]"></span>
{:else}
	<!-- <div class="dropdown dropdown-end fixed right-6 top-6 md:right-24 md:top-12">
		<div tabindex="0" role="button" class="avatar placeholder">
			<div class="w-12 rounded-full bg-neutral text-neutral-content">
				<span class="text-xl">{$page.data.user.username[0]}</span>
			</div>
		</div>
		<ul class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
			<ShortKey diff={-1} {updateRosary} /> -->
	<!-- <ShortKey diff={+3} class="text-success" {updateRosary} />
			<ShortKey diff={+4} class="text-success" {updateRosary} />
			<ShortKey diff={+9} class="text-success" {updateRosary} />
			<ShortKey diff={+12} class="text-success" {updateRosary} />
			<ShortKey diff={-lastDiff} btnText="Undo" {updateRosary} />
			<ShortKey
				diff={--$rosaryDataStore.prayers[currentIdx].at}
				class="text-error"
				btnText="Reset"
				{updateRosary}
			/> -->
	<!-- <li>
				<button
					on:click={async () => await updateRosary(+3)}
					disabled={$rosaryDataStore.prayers[currentIdx].count -
						$rosaryDataStore.prayers[currentIdx].at <
						3}>+3</button
				>
			</li>
			<li><button on:click={async () => await updateRosary(+9)}>+9</button></li>
			<li><button on:click={async () => await updateRosary(+12)}>+12</button></li>
			<li><button on:click={async () => await updateRosary(-1)}>-1</button></li>
			<li><button on:click={async () => await updateRosary(-lastDiff)}>Undo</button></li>
			<li>
				<button
					class="text-error"
					on:click={() => updateRosary(-$rosaryDataStore.prayers[currentIdx].at)}>Reset</button
				>
			</li> -->
	<!-- </ul>
	</div> -->

	{#if $rosaryDataStore.prayers[currentIdx].at < $rosaryDataStore.prayers[currentIdx].count}
		<button on:click={async () => await updateRosary(+1)} class="h-full w-full">
			<div
				class="radial-progress-primary radial-progress"
				style={`--value:${100 * ($rosaryDataStore.prayers[currentIdx].at / $rosaryDataStore.prayers[currentIdx].count)};--size:18rem;--thickness:${$rosaryDataStore.prayers[currentIdx].at === $rosaryDataStore.prayers[currentIdx].count ? '0.75rem' : '0.5rem'};--`}
				role="progressbar"
			>
				<p class="font-digit text-content">
					<span class="text-5xl">
						{$rosaryDataStore.prayers[currentIdx].at}
					</span>
					<span>/{$rosaryDataStore.prayers[currentIdx].count}</span>
				</p>
			</div>
		</button>
	{:else}
		<div class="flex w-full flex-col items-center gap-5">
			<div
				class="radial-progress-primary radial-progress text-success"
				style={`--value:${100 * ($rosaryDataStore.prayers[currentIdx].at / $rosaryDataStore.prayers[currentIdx].count)};--size:18rem;--thickness:${$rosaryDataStore.prayers[currentIdx].at === $rosaryDataStore.prayers[currentIdx].count ? '0.75rem' : '0.5rem'};--`}
				role="progressbar"
			>
				<p class="font-digit text-content">
					<span class="text-5xl">
						{$rosaryDataStore.prayers[currentIdx].at}
					</span>
					<span>/{$rosaryDataStore.prayers[currentIdx].count}</span>
				</p>
			</div>
			<div class="h-20"></div>
			<button
				class="btn btn-success w-full max-w-xs"
				on:click={() => createNewPrayerStore.set(true)}>{LANG.BUTTON.START_NEW[lang]}</button
			>
		</div>
	{/if}
{/if}

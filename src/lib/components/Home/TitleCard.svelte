<script>
	import { page } from '$app/stores';
	import { appConfigsStore, loadingStore } from '$lib/stores/configs';
	import { rosaryDataStore } from '$lib/stores/rosaries';
	let prayerText = '';
	$: {
		if (!$loadingStore) {
			const lang = $appConfigsStore.FRONTEND_CONFIG.value.defaultLanguage;
			if ($rosaryDataStore && $rosaryDataStore.prayers && $rosaryDataStore.prayers.length) {
				const prayer = $rosaryDataStore.prayers[$rosaryDataStore.prayers.length - 1];
				prayerText = prayer.prayer_metadata && prayer.prayer_metadata.name[lang];
			}
		}
	}
</script>

<div class="w-full">
	<div class="card m-4 bg-base-300 p-4">
		<div class="flex flex-row justify-between">
			<p class=" text-content font-semibold">{$page.data.user.username}</p>
			<p class=" text-content">
				{prayerText}
			</p>
		</div>
	</div>
</div>

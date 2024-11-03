<script>
	import { page } from '$app/stores';
	import { appConfigsStore, loadingStore } from '$lib/stores/configs';
	import { rosaryDataStore } from '$lib/stores/rosaries';
</script>

<div class="w-full">
	<div class="card m-4 bg-base-300 p-4">
		<div class="flex flex-row justify-between">
			<p class=" text-content font-semibold">{$page.data.user.username}</p>
			<p class=" text-content">
				{$loadingStore
					? ''
					: $rosaryDataStore.prayers[$rosaryDataStore.prayers.length - 1].prayer_metadata.name[
							$appConfigsStore.FRONTEND_CONFIG.value.defaultLanguage
						]}
			</p>
		</div>
	</div>
</div>

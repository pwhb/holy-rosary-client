<script>
	import ChoosePrayer from '$lib/components/ChoosePrayer/ChoosePrayer.svelte';
	import Rosary from '$lib/components/Rosary/Rosary.svelte';
	import { createNewPrayerStore, rosaryDataStore } from '$lib/stores/rosaries';
</script>

{#if $rosaryDataStore.prayers.length === 0 || $createNewPrayerStore}
	<ChoosePrayer />
{:else}
	<Rosary />
{/if}

<script>
	import { rosaryDataStore } from '$lib/stores/rosaries';
	const currentIdx = $rosaryDataStore.prayers.length - 1;
	export let updateRosary;
	export let diff;
	export let btnText = `${diff > 0 ? '+' : ''}${diff}`;
</script>

{#if $rosaryDataStore.prayers[currentIdx].count - $rosaryDataStore.prayers[currentIdx].at > diff}
	<li>
		<button on:click={async () => await updateRosary(diff)} {...$$restProps}>{btnText}</button>
	</li>
{/if}

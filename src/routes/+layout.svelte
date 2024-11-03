<script lang="ts">
	import TitleCard from '$lib/components/Home/TitleCard.svelte';
	import Loading from '$lib/components/Loading/Loading.svelte';
	import { loadingStore } from '$lib/stores/configs';
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex h-screen flex-col items-center justify-between gap-5">
	<TitleCard />
	{#if $loadingStore}
		<Loading />
	{:else}
		{@render children()}
	{/if}
	<div></div>
</div>

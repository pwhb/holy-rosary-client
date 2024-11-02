<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('mounted', $page.data.user);
	});
</script>

<div>
	<h1 class="underline">{$page.data.title}</h1>
	<p class="font-digit">108</p>
	<p>{JSON.stringify($page.data.deviceId)}</p>
</div>

<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto h-[100vh] max-w-4xl bg-base-200">
	{@render children()}
</div>

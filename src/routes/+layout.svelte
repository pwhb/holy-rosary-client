<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto h-screen max-w-2xl">
	{@render children()}
</div>

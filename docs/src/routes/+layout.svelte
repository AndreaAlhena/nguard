<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '$lib/sass/global.sass';
	import VersionSwitcher from '../components/VersionSwitcher.svelte';
</script>

<div class="version-switcher-wrapper">
	<VersionSwitcher />
</div>

<slot></slot>

<style>
	:global(.version-switcher-wrapper) {
		position: fixed;
		top: 20px;
		right: 300px;
		z-index: 1000;
	}
</style>
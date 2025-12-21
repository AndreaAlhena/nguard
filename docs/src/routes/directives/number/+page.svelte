<script lang="ts">
	import VersionBadge from '../../../components/VersionBadge.svelte';
	import { NUMBER_DIRECTIVES } from '$lib/version';

	const directives = [
		{ key: 'between', description: 'Validates that a number is within a specific range' },
		{ key: 'integer', description: 'Validates that a value is an integer' },
		{ key: 'max', description: "Validates that a number doesn't exceed a maximum" },
		{ key: 'min', description: 'Validates that a number meets a minimum' },
		{ key: 'negative', description: 'Validates that a number is negative' },
		{ key: 'numeric', description: 'Validates that a value is numeric' },
		{ key: 'positive', description: 'Validates that a number is positive' }
	];
</script>

<h1>Number Directives</h1>
<p>A set of directives for numeric value validation in templates.</p>

<h2 class="mt-4">Available Directives</h2>
<ul>
	{#each directives as directive}
		<li>
			<a href="/directives/number/{directive.key}">{NUMBER_DIRECTIVES[directive.key].name}</a>
			- {directive.description}
			<VersionBadge feature={NUMBER_DIRECTIVES[directive.key]} compact={true} />
		</li>
	{/each}
</ul>

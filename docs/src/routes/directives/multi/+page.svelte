<script lang="ts">
	import VersionBadge from '../../../components/VersionBadge.svelte';
	import { MULTI_DIRECTIVES } from '$lib/version';

	const directives = [
		{ key: 'confirmed', description: 'Validates field matches a confirmation field' },
		{ key: 'different', description: 'Validates field is different from another' },
		{ key: 'doesnt-end-with', description: "Validates field doesn't end with values" },
		{ key: 'doesnt-start-with', description: "Validates field doesn't start with values" },
		{ key: 'ends-with', description: 'Validates field ends with one of values' },
		{ key: 'greater-than', description: 'Validates field is greater than another' },
		{
			key: 'greater-than-or-equal',
			description: 'Validates field is greater than or equal to another'
		},
		{ key: 'lesser-than', description: 'Validates field is less than another' },
		{
			key: 'lesser-than-or-equal',
			description: 'Validates field is less than or equal to another'
		},
		{ key: 'required-if', description: 'Validates field is required conditionally' },
		{ key: 'same', description: 'Validates field matches another' },
		{ key: 'starts-with', description: 'Validates field starts with one of values' }
	];
</script>

<h1>Multi Validation Directives</h1>
<p>A set of directives for multi-field validation in templates.</p>

<h2 class="mt-4">Available Directives</h2>
<ul>
	{#each directives as directive}
		<li>
			<a href="/directives/multi/{directive.key}">{MULTI_DIRECTIVES[directive.key].name}</a>
			- {directive.description}
			<VersionBadge feature={MULTI_DIRECTIVES[directive.key]} compact={true} />
		</li>
	{/each}
</ul>

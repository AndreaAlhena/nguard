<script lang="ts">
	import VersionBadge from '../../../components/VersionBadge.svelte';
	import { STRING_DIRECTIVES } from '$lib/version';

	const directives = [
		{ key: 'alpha', description: 'Validates that a string contains only alphabetic characters' },
		{
			key: 'alpha-dash',
			description:
				'Validates that a string contains only alphanumeric characters, dashes, and underscores'
		},
		{
			key: 'alpha-num',
			description: 'Validates that a string contains only alphanumeric characters'
		},
		{ key: 'ascii', description: 'Validates that a string contains only ASCII characters' },
		{ key: 'email', description: 'Validates that a string is a valid email format' },
		{ key: 'json', description: 'Validates that a string is valid JSON' },
		{ key: 'lowercase', description: 'Validates that a string is entirely lowercase' },
		{
			key: 'not-blank',
			description: 'Validates that a string is not empty or whitespace-only'
		},
		{ key: 'not-regex', description: "Validates that a string doesn't match a pattern" },
		{ key: 'regex', description: 'Validates that a string matches a pattern' },
		{ key: 'uppercase', description: 'Validates that a string is entirely uppercase' },
		{ key: 'url', description: 'Validates that a string is a valid URL' }
	];
</script>

<h1>String Directives</h1>
<p>A set of directives for string value validation in templates.</p>

<h2 class="mt-4">Available Directives</h2>
<ul>
	{#each directives as directive}
		<li>
			<a href="/directives/string/{directive.key}">{STRING_DIRECTIVES[directive.key].name}</a>
			- {directive.description}
			<VersionBadge feature={STRING_DIRECTIVES[directive.key]} compact={true} />
		</li>
	{/each}
</ul>

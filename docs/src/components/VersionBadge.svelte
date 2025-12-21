<script lang="ts">
	import type { IFeatureVersion } from '$lib/version';

	/**
	 * Feature version information
	 */
	export let feature: IFeatureVersion;

	/**
	 * Show full version text or compact badge
	 */
	export let compact: boolean = false;

	$: isDeprecated = !!feature.deprecatedIn;
	$: isRemoved = !!feature.removedIn;
	$: badgeClass = isRemoved
		? 'badge-removed'
		: isDeprecated
			? 'badge-deprecated'
			: 'badge-added';
	$: versionText = isRemoved
		? `Removed in ${feature.removedIn}`
		: isDeprecated
			? `Deprecated in ${feature.deprecatedIn}`
			: `Added in ${feature.addedIn}`;
</script>

<span class="version-badge {badgeClass}" class:compact>
	{#if compact}
		v{isRemoved ? feature.removedIn : isDeprecated ? feature.deprecatedIn : feature.addedIn}
	{:else}
		{versionText}
	{/if}
</span>

<style lang="sass">
	.version-badge
		display: inline-block
		padding: 0.25rem 0.5rem
		border-radius: 0.25rem
		font-size: 0.75rem
		font-weight: 600
		line-height: 1
		white-space: nowrap

		&.compact
			padding: 0.125rem 0.375rem
			font-size: 0.625rem

		&.badge-added
			background-color: #d1fae5
			color: #065f46

		&.badge-deprecated
			background-color: #fed7aa
			color: #92400e

		&.badge-removed
			background-color: #fecaca
			color: #991b1b
</style>

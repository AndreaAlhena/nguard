<script lang="ts">
	import { availableVersionsStore, currentVersionStore } from '$lib/version';
	import { goto } from '$app/navigation';

	let isOpen = false;

	/**
	 * Closes the dropdown
	 */
	function closeDropdown(): void {
		isOpen = false;
	}

	/**
	 * Handles version selection
	 * @param version - The selected version object
	 */
	function selectVersion(version: typeof $availableVersionsStore[0]): void {
		currentVersionStore.set(version);
		isOpen = false;

		// Navigate to the version URL
		if (version.url !== window.location.pathname) {
			goto(version.url);
		}
	}

	/**
	 * Toggles the dropdown
	 */
	function toggleDropdown(): void {
		isOpen = !isOpen;
	}

	/**
	 * Handles click outside to close dropdown
	 * @param event - The mouse event
	 */
	function handleClickOutside(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (!target.closest('.version-switcher')) {
			closeDropdown();
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="version-switcher">
	<button class="version-button" on:click|stopPropagation={toggleDropdown} aria-label="Select documentation version">
		<span class="version-label">
			{$currentVersionStore.label}
		</span>
		<svg
			class="chevron"
			class:open={isOpen}
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
		</svg>
	</button>

	{#if isOpen}
		<div class="version-dropdown">
			<div class="dropdown-header">Select Version</div>
			<ul class="version-list">
				{#each $availableVersionsStore as version}
					<li>
						<button
							class="version-item"
							class:active={version.version === $currentVersionStore.version}
							on:click={() => selectVersion(version)}
						>
							<span class="version-name">{version.label}</span>
							{#if version.isLatest}
								<span class="badge-latest">Latest</span>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="sass">
	.version-switcher
		position: relative
		display: inline-block

	.version-button
		display: flex
		align-items: center
		gap: 0.5rem
		padding: 0.5rem 1rem
		background-color: #f3f4f6
		border: 1px solid #d1d5db
		border-radius: 0.375rem
		cursor: pointer
		font-size: 0.875rem
		font-weight: 500
		color: #374151
		transition: all 0.2s ease

		&:hover
			background-color: #e5e7eb
			border-color: #9ca3af

		&:focus
			outline: 2px solid #3b82f6
			outline-offset: 2px

	.version-label
		white-space: nowrap

	.chevron
		transition: transform 0.2s ease

		&.open
			transform: rotate(180deg)

	.version-dropdown
		position: absolute
		top: calc(100% + 0.5rem)
		right: 0
		min-width: 200px
		background-color: white
		border: 1px solid #d1d5db
		border-radius: 0.5rem
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
		z-index: 1000
		overflow: hidden

	.dropdown-header
		padding: 0.75rem 1rem
		font-size: 0.75rem
		font-weight: 600
		text-transform: uppercase
		color: #6b7280
		background-color: #f9fafb
		border-bottom: 1px solid #e5e7eb

	.version-list
		list-style: none
		margin: 0
		padding: 0.5rem 0
		max-height: 300px
		overflow-y: auto

	.version-item
		display: flex
		align-items: center
		justify-content: space-between
		width: 100%
		padding: 0.625rem 1rem
		background-color: transparent
		border: none
		cursor: pointer
		font-size: 0.875rem
		color: #374151
		text-align: left
		transition: background-color 0.15s ease

		&:hover
			background-color: #f3f4f6

		&.active
			background-color: #dbeafe
			color: #1e40af
			font-weight: 500

	.version-name
		flex: 1

	.badge-latest
		display: inline-block
		padding: 0.125rem 0.5rem
		background-color: #10b981
		color: white
		font-size: 0.625rem
		font-weight: 600
		border-radius: 0.25rem
		text-transform: uppercase
		letter-spacing: 0.05em
</style>

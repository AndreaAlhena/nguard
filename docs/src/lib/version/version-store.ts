import { writable } from 'svelte/store';
import { AVAILABLE_VERSIONS } from './available-versions';
import { CURRENT_VERSION } from './constants';
import type { IAvailableVersion } from './available-version.interface';

/**
 * Gets the current version from available versions
 * @returns The current version object or default version
 */
function getCurrentVersionObject(): IAvailableVersion {
	const current = AVAILABLE_VERSIONS.find((v) => v.version === CURRENT_VERSION);
	return current || AVAILABLE_VERSIONS.find((v) => v.isDefault) || AVAILABLE_VERSIONS[0];
}

/**
 * Store for the currently selected documentation version
 */
export const currentVersionStore = writable<IAvailableVersion>(getCurrentVersionObject());

/**
 * Store for all available documentation versions
 */
export const availableVersionsStore = writable<IAvailableVersion[]>(AVAILABLE_VERSIONS);

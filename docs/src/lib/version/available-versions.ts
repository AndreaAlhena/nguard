import type { IAvailableVersion } from './available-version.interface';

/**
 * List of available documentation versions
 *
 * When deploying new versions:
 * 1. Add new version to this array
 * 2. Update the isLatest flag
 * 3. Set the correct URL for each version
 *
 * For local development, all versions point to current deployment
 * For production, each version should point to its deployed URL
 */
export const AVAILABLE_VERSIONS: IAvailableVersion[] = [
	{
		isDefault: true,
		isLatest: true,
		label: 'v0.1.0 (Latest)',
		url: '/',
		version: '0.1.0'
	}
	// Example for future versions:
	// {
	//   version: '0.2.0',
	//   label: 'v0.2.0 (Latest)',
	//   url: '/v0.2.0',
	//   isLatest: true,
	//   isDefault: true
	// },
	// {
	//   version: '0.1.0',
	//   label: 'v0.1.0',
	//   url: '/v0.1.0',
	//   isLatest: false,
	//   isDefault: false
	// }
];

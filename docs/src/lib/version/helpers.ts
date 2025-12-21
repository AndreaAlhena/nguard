import { MULTI_DIRECTIVES } from './multi-directives';
import { NUMBER_DIRECTIVES } from './number-directives';
import { STRING_DIRECTIVES } from './string-directives';
import type { IFeatureVersion } from './feature-version.interface';

/**
 * Gets version info for a directive
 * @param type - The type of directive (string, number, multi)
 * @param name - The directive name
 * @returns Feature version info or undefined
 */
export function getDirectiveVersion(
	type: 'string' | 'number' | 'multi',
	name: string
): IFeatureVersion | undefined {
	switch (type) {
		case 'string':
			return STRING_DIRECTIVES[name];
		case 'number':
			return NUMBER_DIRECTIVES[name];
		case 'multi':
			return MULTI_DIRECTIVES[name];
		default:
			return undefined;
	}
}

/**
 * Checks if a feature is deprecated
 * @param feature - The feature version info
 * @returns True if deprecated
 */
export function isDeprecated(feature: IFeatureVersion): boolean {
	return !!feature.deprecatedIn;
}

/**
 * Checks if a feature is removed
 * @param feature - The feature version info
 * @returns True if removed
 */
export function isRemoved(feature: IFeatureVersion): boolean {
	return !!feature.removedIn;
}

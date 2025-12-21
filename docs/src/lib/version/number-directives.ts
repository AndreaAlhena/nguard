import type { IFeatureVersion } from './feature-version.interface';

/**
 * Version metadata for number directives
 */
export const NUMBER_DIRECTIVES: Record<string, IFeatureVersion> = {
	between: {
		addedIn: '0.1.0',
		name: 'Between'
	},
	integer: {
		addedIn: '0.1.0',
		name: 'Integer'
	},
	max: {
		addedIn: '0.1.0',
		name: 'Max'
	},
	min: {
		addedIn: '0.1.0',
		name: 'Min'
	},
	negative: {
		addedIn: '0.1.0',
		name: 'Negative'
	},
	numeric: {
		addedIn: '0.1.0',
		name: 'Numeric'
	},
	positive: {
		addedIn: '0.1.0',
		name: 'Positive'
	}
};

import type { IFeatureVersion } from './feature-version.interface';

/**
 * Version metadata for string directives
 */
export const STRING_DIRECTIVES: Record<string, IFeatureVersion> = {
	alpha: {
		addedIn: '0.1.0',
		name: 'Alpha'
	},
	'alpha-dash': {
		addedIn: '0.1.0',
		name: 'Alpha Dash'
	},
	'alpha-num': {
		addedIn: '0.1.0',
		name: 'Alpha Num'
	},
	ascii: {
		addedIn: '0.1.0',
		name: 'ASCII'
	},
	email: {
		addedIn: '0.1.0',
		name: 'Email'
	},
	json: {
		addedIn: '0.1.0',
		name: 'JSON'
	},
	lowercase: {
		addedIn: '0.1.0',
		name: 'Lowercase'
	},
	'not-blank': {
		addedIn: '0.1.0',
		name: 'Not Blank'
	},
	'not-regex': {
		addedIn: '0.1.0',
		name: 'Not Regex'
	},
	regex: {
		addedIn: '0.1.0',
		name: 'Regex'
	},
	uppercase: {
		addedIn: '0.1.0',
		name: 'Uppercase'
	},
	url: {
		addedIn: '0.1.0',
		name: 'URL'
	}
};

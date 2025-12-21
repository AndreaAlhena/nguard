import type { IFeatureVersion } from './feature-version.interface';

/**
 * Version metadata for multi directives
 */
export const MULTI_DIRECTIVES: Record<string, IFeatureVersion> = {
	confirmed: {
		addedIn: '0.1.0',
		name: 'Confirmed'
	},
	different: {
		addedIn: '0.1.0',
		name: 'Different'
	},
	'doesnt-end-with': {
		addedIn: '0.1.0',
		name: 'Doesnt End With'
	},
	'doesnt-start-with': {
		addedIn: '0.1.0',
		name: 'Doesnt Start With'
	},
	'ends-with': {
		addedIn: '0.1.0',
		name: 'Ends With'
	},
	'greater-than': {
		addedIn: '0.1.0',
		name: 'Greater Than'
	},
	'greater-than-or-equal': {
		addedIn: '0.1.0',
		name: 'Greater Than Or Equal'
	},
	'lesser-than': {
		addedIn: '0.1.0',
		name: 'Lesser Than'
	},
	'lesser-than-or-equal': {
		addedIn: '0.1.0',
		name: 'Lesser Than Or Equal'
	},
	'required-if': {
		addedIn: '0.1.0',
		name: 'Required If'
	},
	same: {
		addedIn: '0.1.0',
		name: 'Same'
	},
	'starts-with': {
		addedIn: '0.1.0',
		name: 'Starts With'
	}
};

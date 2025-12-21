/**
 * Interface for available documentation versions
 */
export interface IAvailableVersion {
	/**
	 * Whether this is the default version
	 */
	isDefault?: boolean;

	/**
	 * Whether this is the latest version
	 */
	isLatest?: boolean;

	/**
	 * Display label for the version
	 */
	label: string;

	/**
	 * URL to the documentation for this version
	 */
	url: string;

	/**
	 * The version number
	 */
	version: string;
}

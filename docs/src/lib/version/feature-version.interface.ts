/**
 * Interface for feature version information
 */
export interface IFeatureVersion {
	/**
	 * The version when the feature was added
	 */
	addedIn: string;

	/**
	 * The version when the feature was deprecated (if applicable)
	 */
	deprecatedIn?: string;

	/**
	 * The name of the feature
	 */
	name: string;

	/**
	 * The version when the feature was removed (if applicable)
	 */
	removedIn?: string;
}

/**
 * Configuration for validators that allow restricting the accepted character set
 * to ASCII-only. Used by alpha, alphaDash, alphaNum and any future charset-aware validators.
 */
export type CharsetConfig = {
    /**
     * If true, restricts accepted characters to the ASCII range.
     * If false or omitted, the full Unicode range applicable to the validator is allowed.
     */
    hasAsciiOnly?: boolean;
};

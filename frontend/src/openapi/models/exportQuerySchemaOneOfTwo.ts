/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

export type ExportQuerySchemaOneOfTwo = {
    /** The environment to export from */
    environment: string;
    /** Whether to return a downloadable file */
    downloadFile?: boolean;
    /** Selects features to export by tag. Takes precedence over the features field. */
    tag: string;
};

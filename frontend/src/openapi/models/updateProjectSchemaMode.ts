/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * A mode of the project affecting what actions are possible in this project
 */
export type UpdateProjectSchemaMode =
    typeof UpdateProjectSchemaMode[keyof typeof UpdateProjectSchemaMode];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateProjectSchemaMode = {
    open: 'open',
    protected: 'protected',
    private: 'private',
} as const;

/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

export type CreateApiTokenSchemaOneOfThree = {
    /** The time when this token should expire. */
    expiresAt?: string;
    /** A client or frontend token. Must be one of the strings "client" or "frontend" (not case sensitive). */
    type: string;
    /** The environment that the token should be valid for. Defaults to "default" */
    environment?: string;
    /** The project that the token should be valid for. Defaults to "*" meaning every project. This property is mutually incompatible with the `projects` property. If you specify one, you cannot specify the other. */
    project?: string;
    /** A list of projects that the token should be valid for. This property is mutually incompatible with the `project` property. If you specify one, you cannot specify the other. */
    projects?: string[];
    /** The name of the token. */
    tokenName: string;
};

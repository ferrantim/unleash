/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { UpdateStrategySchemaParametersItemType } from './updateStrategySchemaParametersItemType';

export type UpdateStrategySchemaParametersItem = {
    /** The name of the parameter */
    name: string;
    /** The [type of the parameter](https://docs.getunleash.io/reference/custom-activation-strategies#parameter-types) */
    type: UpdateStrategySchemaParametersItemType;
    /** A description of this strategy parameter. Use this to indicate to the users what the parameter does. */
    description?: string;
    /** Whether this parameter must be configured when using the strategy. Defaults to `false` */
    required?: boolean;
};

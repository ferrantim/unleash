/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { ChangeRequestCreateSchemaOneOfNineAction } from './changeRequestCreateSchemaOneOfNineAction';
import type { CreateFeatureStrategySchema } from './createFeatureStrategySchema';

/**
 * Add a strategy to the feature
 */
export type ChangeRequestCreateSchemaOneOfNine = {
    /** The name of the feature that this change applies to. */
    feature: string;
    /** The name of this action. */
    action: ChangeRequestCreateSchemaOneOfNineAction;
    payload: CreateFeatureStrategySchema;
};

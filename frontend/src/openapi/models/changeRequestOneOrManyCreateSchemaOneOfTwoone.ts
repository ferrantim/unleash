/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { ChangeRequestOneOrManyCreateSchemaOneOfTwooneAction } from './changeRequestOneOrManyCreateSchemaOneOfTwooneAction';
import type { SetStrategySortOrderSchema } from './setStrategySortOrderSchema';

/**
 * Reorder strategies for this feature
 */
export type ChangeRequestOneOrManyCreateSchemaOneOfTwoone = {
    /** The name of the feature that this change applies to. */
    feature: string;
    /** The name of this action. */
    action: ChangeRequestOneOrManyCreateSchemaOneOfTwooneAction;
    payload: SetStrategySortOrderSchema;
};

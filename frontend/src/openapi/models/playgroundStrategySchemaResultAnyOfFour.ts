/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { PlaygroundStrategySchemaResultAnyOfFourEvaluationStatus } from './playgroundStrategySchemaResultAnyOfFourEvaluationStatus';
import type { PlaygroundStrategySchemaResultAnyOfFourVariant } from './playgroundStrategySchemaResultAnyOfFourVariant';
import type { VariantSchema } from './variantSchema';

export type PlaygroundStrategySchemaResultAnyOfFour = {
    /** Signals that this strategy was evaluated successfully. */
    evaluationStatus: PlaygroundStrategySchemaResultAnyOfFourEvaluationStatus;
    /** Whether this strategy evaluates to true or not. */
    enabled: boolean;
    /** The feature variant you receive based on the provided context or the _disabled
                          variant_. If a feature is disabled or doesn't have any
                          variants, you would get the _disabled variant_.
                          Otherwise, you'll get one of the feature's defined variants. */
    variant?: PlaygroundStrategySchemaResultAnyOfFourVariant;
    /** The feature variants. */
    variants?: VariantSchema[];
};

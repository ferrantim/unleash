/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { PlaygroundStrategySchemaResultAnyOfEvaluationStatus } from './playgroundStrategySchemaResultAnyOfEvaluationStatus';
import type { PlaygroundStrategySchemaResultAnyOfEnabled } from './playgroundStrategySchemaResultAnyOfEnabled';

export type PlaygroundStrategySchemaResultAnyOf = {
    /** Signals that this strategy could not be evaluated. This is most likely because you're using a custom strategy that Unleash doesn't know about. The `unevaluated` result is also returned if the strategy is disabled. */
    evaluationStatus: PlaygroundStrategySchemaResultAnyOfEvaluationStatus;
    /** Whether this strategy resolves to `false` or if it might resolve to `true`. Because Unleash can't evaluate the strategy, it can't say for certain whether it will be `true`, but if you have failing constraints or segments, it _can_ determine that your strategy would be `false`. */
    enabled: PlaygroundStrategySchemaResultAnyOfEnabled;
};

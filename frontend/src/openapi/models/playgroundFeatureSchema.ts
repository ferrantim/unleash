/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { PlaygroundFeatureSchemaStrategies } from './playgroundFeatureSchemaStrategies';
import type { PlaygroundFeatureSchemaVariant } from './playgroundFeatureSchemaVariant';
import type { VariantSchema } from './variantSchema';

/**
 * A simplified feature toggle model intended for the Unleash playground.
 */
export interface PlaygroundFeatureSchema {
    /** The feature's name. */
    name: string;
    /** The ID of the project that contains this feature. */
    projectId: string;
    /** The feature's applicable strategies and cumulative results of the strategies */
    strategies: PlaygroundFeatureSchemaStrategies;
    /** Whether the feature has a parent dependency that is not satisfied */
    hasUnsatisfiedDependency?: boolean;
    /** Whether the feature is active and would be evaluated in the provided environment in a normal SDK context. */
    isEnabledInCurrentEnvironment: boolean;
    /** Whether this feature is enabled or not in the current environment.
                          If a feature can't be fully evaluated (that is, `strategies.result` is `unknown`),
                          this will be `false` to align with how client SDKs treat unresolved feature states. */
    isEnabled: boolean;
    /** The feature variant you receive based on the provided context or the _disabled
                          variant_. If a feature is disabled or doesn't have any
                          variants, you would get the _disabled variant_.
                          Otherwise, you'll get one of thefeature's defined variants. */
    variant: PlaygroundFeatureSchemaVariant;
    /** The feature variants. */
    variants: VariantSchema[];
}

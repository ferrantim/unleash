/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { ApplicationSchema } from './applicationSchema';

/**
 * An object containing a list of applications that have connected to Unleash via an SDK.
 */
export interface ApplicationsSchema {
    /** The list of applications that have connected to this Unleash instance. */
    applications?: ApplicationSchema[];
}

/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { SamlSettingsSchemaDefaultRootRole } from './samlSettingsSchemaDefaultRootRole';

/**
 * Settings used to authenticate via SAML
 */
export interface SamlSettingsSchema {
    /** Is SAML authentication enabled */
    enabled?: boolean;
    /** The SAML 2.0 entity ID */
    entityId: string;
    /** Which URL to use for Single Sign On */
    signOnUrl: string;
    /** The X509 certificate used to validate requests */
    certificate: string;
    /** Which URL to use for Single Sign Out */
    signOutUrl?: string;
    /** Signing certificate for sign out requests */
    spCertificate?: string;
    /** Should Unleash create users based on the emails coming back in the authentication reply from the SAML server */
    autoCreate?: boolean;
    /** A comma separated list of email domains that Unleash will auto create user accounts for. */
    emailDomains?: string;
    /** Assign this root role to auto created users */
    defaultRootRole?: SamlSettingsSchemaDefaultRootRole;
}

import { AccessService } from '../services/access-service';
import AddonService from '../services/addon-service';
import ProjectService from '../services/project-service';
import StateService from '../services/state-service';
import StrategyService from '../services/strategy-service';
import TagTypeService from '../services/tag-type-service';
import TagService from '../services/tag-service';
import ClientInstanceService from '../services/client-metrics/instance-service';
import ContextService from '../services/context-service';
import VersionService from '../services/version-service';
import { ApiTokenService } from '../services/api-token-service';
import { EmailService } from '../services/email-service';
import UserService from '../services/user-service';
import ResetTokenService from '../services/reset-token-service';
import FeatureTypeService from '../services/feature-type-service';
import EventService from '../services/event-service';
import HealthService from '../services/health-service';
import SettingService from '../services/setting-service';
import SessionService from '../services/session-service';
import UserFeedbackService from '../services/user-feedback-service';
import FeatureToggleService from '../services/feature-toggle-service';
import EnvironmentService from '../services/environment-service';
import FeatureTagService from '../services/feature-tag-service';
import ProjectHealthService from '../services/project-health-service';
import ClientMetricsServiceV2 from '../services/client-metrics/metrics-service-v2';
import UserSplashService from '../services/user-splash-service';
import { OpenApiService } from '../services/openapi-service';
import { ClientSpecService } from '../services/client-spec-service';
import { PlaygroundService } from 'lib/features/playground/playground-service';
import { GroupService } from '../services/group-service';
import { ProxyService } from '../services/proxy-service';
import EdgeService from '../services/edge-service';
import PatService from '../services/pat-service';
import { PublicSignupTokenService } from '../services/public-signup-token-service';
import { LastSeenService } from '../services/client-metrics/last-seen/last-seen-service';
import { InstanceStatsService } from '../features/instance-stats/instance-stats-service';
import { FavoritesService } from '../services/favorites-service';
import MaintenanceService from '../services/maintenance-service';
import { AccountService } from '../services/account-service';
import { SchedulerService } from '../services/scheduler-service';
import { Knex } from 'knex';
import ExportImportService from '../features/export-import-toggles/export-import-service';
import { ISegmentService } from '../segments/segment-service-interface';
import ConfigurationRevisionService from '../features/feature-toggle/configuration-revision-service';
import EventAnnouncerService from 'lib/services/event-announcer-service';
import { IPrivateProjectChecker } from '../features/private-project/privateProjectCheckerType';
import { DependentFeaturesService } from '../features/dependent-features/dependent-features-service';
import { WithTransactional } from 'lib/db/transaction';

export interface IUnleashServices {
    accessService: AccessService;
    accountService: AccountService;
    addonService: AddonService;
    apiTokenService: ApiTokenService;
    clientInstanceService: ClientInstanceService;
    clientMetricsServiceV2: ClientMetricsServiceV2;
    contextService: ContextService;
    emailService: EmailService;
    environmentService: EnvironmentService;
    eventService: EventService;
    edgeService: EdgeService;
    featureTagService: FeatureTagService;
    featureToggleService: WithTransactional<FeatureToggleService>;
    /** @deprecated use featureToggleService variable instead */
    featureToggleServiceV2: WithTransactional<FeatureToggleService>;
    featureTypeService: FeatureTypeService;
    groupService: GroupService;
    healthService: HealthService;
    projectHealthService: ProjectHealthService;
    projectService: ProjectService;
    playgroundService: PlaygroundService;
    proxyService: ProxyService;
    publicSignupTokenService: PublicSignupTokenService;
    resetTokenService: ResetTokenService;
    sessionService: SessionService;
    settingService: SettingService;
    stateService: StateService;
    strategyService: StrategyService;
    tagService: TagService;
    tagTypeService: TagTypeService;
    userFeedbackService: UserFeedbackService;
    userService: UserService;
    versionService: VersionService;
    userSplashService: UserSplashService;
    segmentService: ISegmentService;
    openApiService: OpenApiService;
    clientSpecService: ClientSpecService;
    patService: PatService;
    lastSeenService: LastSeenService;
    instanceStatsService: InstanceStatsService;
    favoritesService: FavoritesService;
    maintenanceService: MaintenanceService;
    /** @deprecated prefer exportImportServiceV2, we're doing a gradual rollout */
    exportImportService: ExportImportService;
    exportImportServiceV2: WithTransactional<ExportImportService>;
    configurationRevisionService: ConfigurationRevisionService;
    schedulerService: SchedulerService;
    eventAnnouncerService: EventAnnouncerService;
    /** @deprecated prefer exportImportServiceV2, we're doing a gradual rollout */
    transactionalExportImportService: (
        db: Knex.Transaction,
    ) => Pick<ExportImportService, 'import' | 'validate'>;
    transactionalGroupService: (db: Knex.Transaction) => GroupService;
    privateProjectChecker: IPrivateProjectChecker;
    dependentFeaturesService: DependentFeaturesService;
    transactionalDependentFeaturesService: (
        db: Knex.Transaction,
    ) => DependentFeaturesService;
}

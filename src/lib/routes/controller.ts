import { IRouter, Router, Request, Response, RequestHandler } from 'express';
import { Logger } from 'lib/logger';
import { IUnleashConfig } from '../types/option';
import { NONE } from '../types/permissions';
import { handleErrors } from './util';
import requireContentType from '../middleware/content_type_checker';
import { PermissionError } from '../error';
import {
    ApiOperation,
    getStandardResponses,
    StandardResponseCodes,
} from '../../lib/openapi';
import { OpenApiService } from '../../lib/services';
import { IUnleashServices } from 'lib/types';

interface IRequestHandler<
    P = any,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any,
> {
    (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response<ResBody>,
    ): Promise<void> | void;
}

type Permission = string | string[];

interface IRouteOptionsBase {
    path: string;
    permission: Permission;
    middleware?: RequestHandler[];
    handler: IRequestHandler;
    acceptedContentTypes?: string[];
}

interface IRouteOptionsGet extends IRouteOptionsBase {
    method: 'get';
}

interface IRouteOptionsNonGet extends IRouteOptionsBase {
    method: 'post' | 'put' | 'patch' | 'delete';
    acceptAnyContentType?: boolean;
}

type IRouteOptions = IRouteOptionsNonGet | IRouteOptionsGet;

const checkPermission =
    (permission: Permission = []) =>
    async (req, res, next) => {
        const permissions = (
            Array.isArray(permission) ? permission : [permission]
        ).filter((p) => p !== NONE);

        if (!permissions.length) {
            return next();
        }
        if (req.checkRbac && (await req.checkRbac(permissions))) {
            return next();
        }
        return res.status(403).json(new PermissionError(permissions)).end();
    };

/**
 * Base class for Controllers to standardize binding to express Router.
 *
 * This class will take care of the following:
 * - try/catch inside RequestHandler
 * - await if the RequestHandler returns a promise.
 * - access control
 * - add openapi standard response codes
 */
export default class Controller {
    private ownLogger: Logger;

    app: IRouter;

    config: IUnleashConfig;

    protected openApiService: OpenApiService;

    constructor(
        config: IUnleashConfig,
        { openApiService }: Pick<IUnleashServices, 'openApiService'>,
    ) {
        this.ownLogger = config.getLogger(
            `controller/${this.constructor.name}`,
        );
        this.app = Router();
        this.config = config;
        this.openApiService = openApiService;
    }

    private useRouteErrorHandler(handler: IRequestHandler): IRequestHandler {
        return async (req: Request, res: Response) => {
            try {
                await handler(req, res);
            } catch (error) {
                handleErrors(res, this.ownLogger, error);
            }
        };
    }

    private useContentTypeMiddleware(options: IRouteOptions): RequestHandler[] {
        const { middleware = [], acceptedContentTypes = [] } = options;

        return options.method === 'get' || options.acceptAnyContentType
            ? middleware
            : [requireContentType(...acceptedContentTypes), ...middleware];
    }

    route(options: IRouteOptions): void {
        this.app[options.method](
            options.path,
            checkPermission(options.permission),
            this.useContentTypeMiddleware(options),
            this.useRouteErrorHandler(options.handler.bind(this)),
        );
    }

    routeWithOpenApi(openApiService: OpenApiService) {
        return ({
            openApi,
            ...options
        }: IRouteOptions & { openApi: ApiOperation }): void => {
            const errorCodes = new Set<StandardResponseCodes>([401]);

            if (
                ['put', 'post', 'patch'].includes(
                    options?.method?.toLowerCase() || '',
                )
            ) {
                errorCodes.add(400);
                errorCodes.add(413);
                errorCodes.add(415);
            }

            if (options.path.includes(':')) {
                errorCodes.add(404);
            }

            if (options.permission !== NONE) {
                errorCodes.add(403);
            }

            const openApiWithErrorCodes = {
                ...openApi,
                responses: {
                    ...getStandardResponses(...errorCodes),
                    ...openApi.responses,
                },
            };
            return this.route({
                ...options,
                middleware: [
                    ...(options.middleware ?? []),
                    openApiService.validPath(openApiWithErrorCodes),
                ],
            });
        };
    }

    get(
        path: string,
        handler: IRequestHandler,
        permission: Permission = NONE,
    ): void {
        this.route({
            method: 'get',
            path,
            handler,
            permission,
        });
    }

    post(
        path: string,
        handler: IRequestHandler,
        permission: Permission = NONE,
        ...acceptedContentTypes: string[]
    ): void {
        this.route({
            method: 'post',
            path,
            handler,
            permission,
            acceptedContentTypes,
        });
    }

    put(
        path: string,
        handler: IRequestHandler,
        permission: Permission = NONE,
        ...acceptedContentTypes: string[]
    ): void {
        this.route({
            method: 'put',
            path,
            handler,
            permission,
            acceptedContentTypes,
        });
    }

    patch(
        path: string,
        handler: IRequestHandler,
        permission: Permission = NONE,
        ...acceptedContentTypes: string[]
    ): void {
        this.route({
            method: 'patch',
            path,
            handler,
            permission,
            acceptedContentTypes,
        });
    }

    delete(
        path: string,
        handler: IRequestHandler,
        permission: Permission = NONE,
    ): void {
        this.route({
            method: 'delete',
            path,
            handler,
            permission,
            acceptAnyContentType: true,
        });
    }

    fileupload(
        path: string,
        filehandler: IRequestHandler,
        handler: Function,
        permission: Permission = NONE,
    ): void {
        this.app.post(
            path,
            checkPermission(permission),
            filehandler.bind(this),
            this.useRouteErrorHandler(handler.bind(this)),
        );
    }

    use(path: string, router: IRouter): void {
        this.app.use(path, router);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    useWithMiddleware(path: string, router: IRouter, middleware: any): void {
        this.app.use(path, middleware, router);
    }

    get router(): any {
        return this.app;
    }
}

module.exports = Controller;

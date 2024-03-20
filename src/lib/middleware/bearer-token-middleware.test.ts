import type { Request, Response, NextFunction } from 'express';
import { bearerTokenMiddleware } from './bearer-token-middleware';

const exampleSignalToken = 'signal_tokensecret';

describe('bearerTokenMiddleware', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {},
        } as Request;
        res = {} as Response;
        next = jest.fn();
    });

    it('should call next', () => {
        bearerTokenMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should leave Unleash tokens intact', () => {
        req.headers = { authorization: exampleSignalToken };

        bearerTokenMiddleware(req, res, next);

        expect(req.headers.authorization).toBe(exampleSignalToken);
    });

    it('should convert Bearer token to Unleash token', () => {
        const bearerToken = `Bearer ${exampleSignalToken}`;
        req.headers = { authorization: bearerToken };

        bearerTokenMiddleware(req, res, next);

        expect(req.headers.authorization).toBe(exampleSignalToken);
    });

    it('should be case insensitive in the scheme', () => {
        const bearerToken = `bEaReR ${exampleSignalToken}`;
        req.headers = { authorization: bearerToken };

        bearerTokenMiddleware(req, res, next);

        expect(req.headers.authorization).toBe(exampleSignalToken);
    });
});

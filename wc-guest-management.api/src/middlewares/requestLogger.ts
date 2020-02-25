import { NextFunction, Request, Response } from 'express';

const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.info(
            `${req.method} ${req.originalUrl} ${res.statusCode} finished in ${elapsed}ms`
        );
    });
    next();
};

export default requestLogger;

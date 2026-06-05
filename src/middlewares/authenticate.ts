import type { NextFunction, Request, Response } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.session.user) {
            throw new Error('Please login');
        }

        next();
    } catch (err) {
        res.render('login', {
            error: true,
            errorMessage: err,
        });
    }
};

export { authenticate };

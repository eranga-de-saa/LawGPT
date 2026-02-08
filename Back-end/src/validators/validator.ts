import {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';

export class validator {
    static validate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: errors.array().map(err => ({
                    message: err.msg
                }))
            });
        }
        next();
    }
}

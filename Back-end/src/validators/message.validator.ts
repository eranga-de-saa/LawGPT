import {body} from 'express-validator';
import { validator } from './validator';

export class MessageValidator {
    static createQueryValidation = [
        body('query')
            .isString()
            .withMessage('Query must be a string')
            .notEmpty()
            .withMessage('Query cannot be empty')
            .isLength({ max: 2000 })
            .withMessage('Query cannot exceed 2000 characters'),
        validator.validate
    ];
}
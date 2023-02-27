import { plainToClass } from "class-transformer";
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpsException } from "../exeptions/HttpException";

const validationMiddleware = (type: any, value: string | 'body' | 'query' | 'params' = 'body', skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction)  => {
        validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
            if(errors.length > 0) {
                const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                next(new HttpsException(400, message));
            } else {
                next()
            }
        })
    }
}
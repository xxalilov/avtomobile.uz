import { NextFunction, Response } from "express";
import { DataStoredInToken, RequestWithUser } from "../interfaces/auth.interface";
import { HttpException } from "../exeptions/HttpException";
import config from "../config/config";
import { verify } from "jsonwebtoken";
import { models } from "../utils/database";

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization')?.split('Bearer ')[1] : null);

        if(Authorization) {
            const secretKey: string = config.SECRET_KEY;
            const verificationResponse = verify(Authorization, secretKey) as DataStoredInToken;
            const userId = verificationResponse.id;
            const findUser = await models.Users.findByPk(userId);

            if(findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(new HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'));
    }
}

export default authMiddleware;
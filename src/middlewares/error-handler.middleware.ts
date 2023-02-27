import { Request, Response, NextFunction } from "express";
import { HttpsException } from "../exeptions/HttpException";

const errorMiddleware = (error: HttpsException, req: Request, res: Response, next: NextFunction) => {
    try{
        const status: number = error.status || 500;
        const message: string = error.message || "Something went wrong";

        console.log(error)

        res.status(status).json({message});
    }catch (error) {
        next(error)
    }
}

export default errorMiddleware;
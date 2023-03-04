import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exeptions/HttpException";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try{
        const status: number = error.status || 500;
        const message: string = error.message || "Something went wrong";

        console.log(error)

        res.status(status).json({status, message});
    }catch (error) {
        next(error)
    }
}

export default errorMiddleware;
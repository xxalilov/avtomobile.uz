import { Request, Response, NextFunction } from "express";
import { get, controller } from "../decorators";

@controller('/auth')
class AuthController {
    @get('/signup')
    public signup(req: Request, res: Response, next: NextFunction): void {
        res.status(200).json({
            message: "ok"
        })
    }
}
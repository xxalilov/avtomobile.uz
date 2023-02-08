import { Request, Response } from "express";

class AuthController {
    public signup(req: Request, res: Response): void {
        res.send(req.body);
    }
}

export default AuthController;
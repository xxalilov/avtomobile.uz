import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { CreateUserDto } from "../dtos/user.dto";
import { User } from "../interfaces/user.interface";
import { RequestWithUser } from "../interfaces/auth.interface";

class AuthController {
    private authService = new AuthService();

    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: CreateUserDto = req.body;
            const signupUserData: User = await this.authService.signup(userData);

            res.status(201).json({ data: signupUserData, message: 'signup' })
        } catch (error) {
            next(error)
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: CreateUserDto = req.body;
            const { cookie, findUser } = await this.authService.signin(userData);

            res.setHeader('Set-Cookie', [cookie]);
            res.status(200).json({ data: findUser, message: "signin" });
        } catch (error) {
            next(error)
        }
    }

    public async signOut(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const userData: User = req.user;
            const signOutUserData: User = await this.authService.signout(userData);

            res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
            res.status(200).json({ data: signOutUserData, message: 'logout' });
        } catch (error) {
            next(error)
        }
    }
}

export default AuthController;
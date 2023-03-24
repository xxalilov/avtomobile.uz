import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import AuthController from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreateUserDto } from "../dtos/user.dto";
import authMiddleware from "../middlewares/auth.middleware";

class AuthRouter implements Routes {
    public path = '/auth';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp.bind(this.authController));
        this.router.post(`${this.path}/signin`, validationMiddleware(CreateUserDto, 'body'), this.authController.signIn.bind(this.authController));
        // @ts-ignore
        this.router.post(`${this.path}/signout`, authMiddleware, this.authController.signOut.bind(this.authController));
    }
}
export default AuthRouter;
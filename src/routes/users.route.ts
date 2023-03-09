import { Router } from "express";
import UserController from "../controllers/user.controller";
import { CreateUserDto } from "../dtos/user.dto";
import { Routes } from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";

class UserRoute implements Routes {
    public path = '/users';
    public router = Router();
    public usersController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.usersController.getAllUsers)
    }
}

export default UserRoute;
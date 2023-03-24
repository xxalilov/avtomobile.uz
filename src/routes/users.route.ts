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
        this.router.get(`${this.path}`, this.usersController.getAllUsers.bind(this.usersController))
        this.router.get(`${this.path}/:id`, this.usersController.getUserById.bind(this.usersController))
        this.router.put(`${this.path}/:id`, this.usersController.updateUser.bind(this.usersController))
        this.router.delete(`${this.path}/:id`, this.usersController.deleteUser.bind(this.usersController))
        this.router.post(`${this.path}`,validationMiddleware(CreateUserDto, 'body'),  this.usersController.createUser.bind(this.usersController))
        // this.router.get(`${this.path}`, this.usersController.getAllUsers)
    }
}

export default UserRoute;
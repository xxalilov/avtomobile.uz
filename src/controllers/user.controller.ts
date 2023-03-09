import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { User } from "../interfaces/user.interface";

class UserController {
    private userService = UserService;

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const findAllUsersData: User[] = await this.userService.findAllUsers();
            res.status(200).json({data: findAllUsersData, message: 'findAll'})
        } catch (error) {
            next(error);
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const createdUser = await this.userService.createUser(req.body);
            res.status(201).json({
                data: createdUser, message: 'createUser'
            })
        } catch (error) {
            next(error)
        }
    }
}

export default UserController;
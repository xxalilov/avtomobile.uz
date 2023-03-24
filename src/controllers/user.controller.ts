import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { User } from "../interfaces/user.interface";
import { CreateUserDto, UpdateUserDto } from "dtos/user.dto";

class UserController {
    private userService = new UserService()

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
            const userData: CreateUserDto = req.body;
            const createdUser = await this.userService.createUser(userData);
            res.status(201).json({
                data: createdUser, message: 'created'
            })
        } catch (error) {
            next(error)
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const findOneUserData: User = await this.userService.findUserById(req.params.id);
            res.status(200).json({data: findOneUserData, message: "findOne"})
        } catch (error) {
            next(error)
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: UpdateUserDto = req.body;
            const updatedUser: User = await this.userService.updateUser(req.params.id, userData);
            res.status(200).json({data: updatedUser, message: "updateUser"})
        } catch (error) {
            next(error)
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedUser: User = await this.userService.deleteUser(req.params.id);
            res.status(200).json({data: deletedUser, message: "deletedUser"})
        } catch (error) {
            next(error)
        }
    }
}

export default UserController;
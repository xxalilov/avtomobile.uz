import { NextFunction, Request, Response } from "express";
import { controller, get } from "../decorators/index";
import UserService from "../services/user.service";
import { User } from "../interfaces/user.interface";

@controller('/users')
class AuthController {
    public userService = new UserService()

    @get('/')
    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(this.userService)
            res.status(200).json({data: [], message: 'findAll'})
            // const findAllUsersData: User[] = await this.userService.findAllUsers();
            // console.log(findAllUsersData)
            // res.status(200).json({data: findAllUsersData, message: 'findAll'})
        } catch (error) {
            next(error);
        }
    }
}
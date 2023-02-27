import UserModel from "../models/user.model";
import { User } from "../interfaces/user.interface";
import { HttpsException } from "../exeptions/HttpException";
import { isEmpty } from "../utils/isEpmty";

class UserService {
    public users = UserModel;

    public async findAllUsers(): Promise<User[]> {
        const allUser: User[] = await this.users.findAll();
        return allUser;
    }

    public async findUserById(id: string): Promise<User> {
        const user = await this.users.findByPk(id);
        if(!user) throw new HttpsException(409, "User doesn't exist")
        return user;
    } 

    public async createUser(): Promise<User> {
        if()
    }
}

export default UserService;
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user.interface";

class UserService {
    public users = UserModel;

    public async findAllUsers(): Promise<User[]> {
        const allUser: User[] = await this.users.findAll();
        return allUser;
    }
}

export default UserService;
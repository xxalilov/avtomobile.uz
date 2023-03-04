import UserModel from "../models/user.model";
import { hash } from 'bcrypt';
import { User } from "../interfaces/user.interface";
import { HttpException } from "../exeptions/HttpException";
import { isEmpty } from "../utils/isEpmty";
import { CreateUserDto } from "dtos/user.dto";

class UserService {
    public users = UserModel;

    public async findAllUsers(): Promise<User[]> {
        const allUser: User[] = await this.users.findAll();
        return allUser;
    }

    public async findUserById(id: string): Promise<User> {
        if(isEmpty(id)) throw new HttpException(400, "UserId is empty");

        const user = await this.users.findByPk(id);
        if(!user) throw new HttpException(409, "User doesn't exist")
        return user;
    } 

    public async createUser(userData: CreateUserDto): Promise<User> {
        if(isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser = await this.users.findOne({where: {email: userData.email}});
        if(findUser) throw new HttpException(400, `This email ${userData.email} already exist`);
        const hashedPassword = await hash(userData.password, 10);
        const createdUser: User = await this.users.create({...userData, password: hashedPassword})
        return createdUser;
    }
}

export default UserService;
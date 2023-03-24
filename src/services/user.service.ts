import { hash } from 'bcrypt';
import { User } from "../interfaces/user.interface";
import { HttpException } from "../exeptions/HttpException";
import { isEmpty } from "../utils/isEpmty";
import { CreateUserDto, UpdateUserDto } from "dtos/user.dto";
import { models } from '../utils/database';

class UserService {
    public users = models.Users;

    public async findAllUsers(): Promise<User[]> {
        const allUser: User[] = await this.users.findAll({attributes: {exclude: ['password']}});
        return allUser;
    }

    public async findUserById(id: string): Promise<User> {
        if(isEmpty(id)) throw new HttpException(400, "UserId is empty");

        const user: (User | null) = await this.users.findByPk(id);
        if(!user) throw new HttpException(409, "User doesn't exist")
        return user;
    } 

    public async createUser(userData: CreateUserDto): Promise<User> {
        if(isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: (User | null) = await this.users.findOne({where: {email: userData.email}});
        if(findUser) throw new HttpException(400, `This email ${userData.email} already exist`);
        const hashedPassword = await hash(userData.password, 10);
        const createdUser: User = await this.users.create({...userData, password: hashedPassword})
        return createdUser;
    }

    public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
        if(isEmpty(userData)) throw new HttpException(400, "userData is empty");
        const findUser = await this.users.findByPk(userId);
        if (!findUser) throw new HttpException(409, "User doesn't exist");
        const hashedPassword = await hash(userData.password, 10);
        // const updatedUser: User = this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });
        const updatedUser = await findUser.update({...userData, password: hashedPassword});
        await updatedUser.save();
    
        return updatedUser;
    }

    public async deleteUser(userId: string): Promise<User> {
        if(isEmpty(userId)) throw new HttpException(400, "UserId doesn't exist");

        const findUser: (User | null) = await this.users.findByPk(userId);
        if(!findUser) throw new HttpException(409, "User doesn't exist");
        await this.users.destroy({where: { id: userId }});

        return findUser;
    }
}

export default UserService;
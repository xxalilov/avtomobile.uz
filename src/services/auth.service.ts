import { isEmpty } from "../utils/isEpmty";
import { User } from "../interfaces/user.interface";
import { models } from "../utils/database";
import { CreateUserDto } from "../dtos/user.dto";
import { HttpException } from "../exeptions/HttpException";
import { compare, hash } from "bcrypt";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import config from "../config/config";
import { sign } from "jsonwebtoken";

class AuthService {
    public users = models.Users;

    public async signup(userData: CreateUserDto): Promise<User> {
        if(isEmpty(userData)) throw new HttpException(400, "userData is empty");
        const findUser: (User | null) = await this.users.findOne({where: {email: userData.email}});
        if(findUser) throw new HttpException(400, `This email ${userData.email} already exist`);
        const hashedPassword = await hash(userData.password, 10);
        const createdUser: User = await this.users.create({...userData, password: hashedPassword})
        return createdUser;
    }

    public async signin(userData: CreateUserDto): Promise<{cookie: string; findUser: User}> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
        const findUser: (User | null) = await this.users.findOne({where: {email: userData.email}});
        if(!findUser) throw new HttpException(400, `This email ${userData.email} was not found`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "Password not matching");

        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, findUser }
    }

    public async signout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: (User | null) = await this.users.findOne({ where: { email: userData.email, password: userData.password }})
     if(!findUser) throw new HttpException(409, "User doesn't exist");
     return findUser;
    }

    public createToken(user: User): TokenData {
        const dataStoredInToken: DataStoredInToken = { id: user.id }
        const secretKey: string = config.SECRET_KEY;
        const expiresIn: number = 60 * 60;
        return { expiresIn, token: sign(dataStoredInToken, secretKey, {expiresIn}) }
    }

    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}

export default AuthService;
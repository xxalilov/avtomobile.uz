import { IsString, IsEmail, Validate } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}

export class UpdateUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}
import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { User } from "../interfaces/user.interface";

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
    public id: string;
    public email: string;
    public password: string;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
    UserModel.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING(45)
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(255),
        }
    }, {
        tableName: 'users',
        sequelize
    });

    return UserModel;
}
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../utils/database'
import { User } from "../interfaces/user.interface";

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password'>;

class UserModel extends Model<User, UserCreationAttributes> implements User {
    declare id: string;
    declare email: string;
    declare password: string;
    
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}
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

    export default UserModel;
import { Sequelize } from "sequelize";
import config from "../config/config";

export const sequelize = new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD, {
    dialect: 'postgres',
    host: config.DB_HOST,
    port: parseInt(config.DB_PORT),
    timezone: "+09:00"
});

const DB = async function() {
    try {
        await sequelize.sync({force: false});
        console.log("Connected to DATABASE")
    } catch (error) {
        console.log(error)
    }
}

export default DB;
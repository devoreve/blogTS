import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "app",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "", {
        host: "localhost",
        dialect: "mysql",
        logging: false,
    });

export default sequelize;
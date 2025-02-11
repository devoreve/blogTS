import { Sequelize } from "sequelize";
const config = require("./database.js");
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const dbConfig = (config as any)[env]; // TypeScript ne reconnaît pas bien les fichiers .js

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

export default sequelize;
// import {Options, Sequelize} from "sequelize";
// import dotenv from "dotenv";
//
// dotenv.config();
//
// const config: Options = {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: "mysql"
// };
//
// const sequelize = new Sequelize(config);
//
// export default sequelize;

require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql"
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_TEST,
        host: process.env.DB_HOST,
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_PROD,
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
};
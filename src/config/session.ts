import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import sequelize from "./sequelize";

const SessionStore = SequelizeStore(session.Store);

export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({
        db: sequelize,
        tableName: "sessions",
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 24 * 60 * 60 * 1000,
    }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
});
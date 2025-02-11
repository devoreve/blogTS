import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import postRoutes from "./src/routes/postRoutes";
import authRoutes from "./src/routes/authRoutes";
import {sessionMiddleware} from "./src/config/session";
import sequelize from "./src/config/sequelize";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionMiddleware);
sequelize.sync();
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Routes
app.use(postRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
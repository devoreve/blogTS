import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import postRoutes from "./src/routes/postRoutes";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(postRoutes);

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
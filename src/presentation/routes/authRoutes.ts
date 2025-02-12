import {Router} from "express";
import AuthController from "../controllers/AuthController";
import {UserRepository} from "../../infrastructure/repositories/UserRepository";

const router = Router();

const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

router.get("/register", authController.showRegister.bind(authController));
router.post("/register", authController.register.bind(authController));
router.get("/login", authController.showLogin.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/logout", authController.logout.bind(authController));

export default router;
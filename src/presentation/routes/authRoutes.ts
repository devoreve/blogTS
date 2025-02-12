import {Router} from "express";
import AuthController from "../controllers/AuthController";
import {UserRepository} from "../../infrastructure/repositories/UserRepository";
import {AuthService} from "../../application/services/AuthService";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.get("/register", authController.showRegister.bind(authController));
router.post("/register", authController.register.bind(authController));
router.get("/login", authController.showLogin.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/logout", authController.logout.bind(authController));

export default router;
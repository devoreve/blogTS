import { Request, Response } from "express";
import User from "../models/user/User";
import {UserRepository} from "../models/user/UserRepository";

class AuthController {
    constructor(private userRepository: UserRepository) {}

    async showRegister(req: Request, res: Response): Promise<void> {
        res.render("user/register");
    }

    async register(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            res.status(400).send("L'utilisateur existe déjà");
            return;
        }

        try {
            const user = await this.userRepository.createUser(email, password);
            req.session.userId = user.id;
            res.redirect("/");
        } catch (error) {
            res.status(400).send("Erreur lors de l'inscription");
        }
    }

    async showLogin(req: Request, res: Response) {
        res.render("user/login");
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const user: User|null = await this.userRepository.findByEmail(email);

        if (!user || !(await user.comparePassword(password))) {
            res.status(401).send("Email ou mot de passe incorrect");
            return;
        }

        req.session.userId = user.id;
        res.redirect("/");
    }

    logout(req: Request, res: Response) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Erreur lors de la déconnexion");
            }
            res.redirect("/login");
        });
    }
}

export default AuthController;
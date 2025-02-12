import { Request, Response } from "express";
import User from "../models/user/User";
import {UserRepository} from "../models/user/UserRepository";

class AuthController {
    constructor(private userRepository: UserRepository) {}

    async showRegister(req: Request, res: Response): Promise<void> {
        res.render("user/register", {
            errors: req.flash("errors")
        });
    }

    async register(req: Request, res: Response): Promise<void> {
        const { email, password, confirm_password: confirmPassword} = req.body;
        const errors: string[] = [];

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (password !== confirmPassword) {
            errors.push("Les mots de passe ne correspondent pas");
        }

        if (password.length < 8) {
            errors.push("Le mot de passe doit contenir au moins 8 caractères.");
        }

        if (!emailRegex.test(email)) {
            errors.push("Le format de l'email est invalide.");
        }

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            errors.push("L'utilisateur existe déjà");
        }

        if (errors.length > 0) {
            req.flash("errors", errors);
            res.redirect("/register");
            return;
        }

        try {
            const user = await this.userRepository.createUser(email, password);
            req.session.userId = user.id;
            res.redirect("/");
        } catch (error) {
           req.flash("errors", ["Erreur lors de l'inscription"]);
           res.redirect("/register");
        }
    }

    async showLogin(req: Request, res: Response) {
        res.render("user/login", {errors: req.flash("errors")});
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const user: User|null = await this.userRepository.findByEmail(email);

        if (!user || !(await user.comparePassword(password))) {
            req.flash("errors", ["Email ou mot de passe incorrect."]);
            res.redirect("/login");
            return;
        }

        req.session.userId = user.id;
        res.redirect("/");
    }

    logout(req: Request, res: Response) {
        req.session.destroy((err) => {
            if (err) {
                req.flash("errors", ["Erreur lors de la déconnexion."]);
                res.redirect("/");
                return;
            }
            res.redirect("/login");
        });
    }
}

export default AuthController;
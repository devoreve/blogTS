import { Request, Response } from "express";
import {AuthService} from "../../application/services/AuthService";
import UserDTO from "../../application/dtos/UserDTO";

class AuthController {
    constructor(private authService: AuthService) {}

    async showRegister(req: Request, res: Response): Promise<void> {
        res.render("user/register", {
            errors: req.flash("errors")
        });
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            // On récupère les données du formulaire
            const { email, password, confirm_password: confirmPassword} = req.body;

            // On demande au service d'authentification d'inscrire l'utilisateur
            const user: UserDTO = await this.authService.register(email, password, confirmPassword);

            // On stocke l'id de l'utilisateur dans la session avant de rediriger
            req.session.userId = user.id;
            res.redirect("/");
        } catch (error: any) {
            // Si une erreur survient, on stocke l'erreur dans la session flash et on redirige
            req.flash("errors", [error.message]);
            res.redirect('/register');
        }
    }

    async showLogin(req: Request, res: Response): Promise<void> {
        res.render("user/login", {errors: req.flash("errors")});
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            // On récupère les données du formulaire
            const { email, password } = req.body;

            // On demande au service d'authentification de récupérer l'utilisateur connecté
            const user: UserDTO = await this.authService.login(email, password);

            // On stocke l'id de l'utilisateur dans la session avant de rediriger
            req.session.userId = user.id;
            res.redirect("/");
        } catch (error: any) {
            // Si une erreur survient, on stocke l'erreur dans la session flash et on redirige
            req.flash("errors", [error.message]);
            res.redirect('/login');
        }
    }

    logout(req: Request, res: Response) {
        // Suppression de la session (aucun lien avec les services)
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
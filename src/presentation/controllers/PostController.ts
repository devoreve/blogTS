import {Request, Response} from "express";
import PostService from "../../application/services/PostService";
import PostDTO from "../../application/dtos/PostDTO";

export class PostController {
    constructor(private postService: PostService) {}

    async index(req: Request, res: Response): Promise<void> {
        // On récupère tous les articles (uniquement les DTO contenant les données à afficher)
        // depuis le service
        const posts: PostDTO[] = await this.postService.getAllPosts();
        res.render("post/post_list", {posts});
    }

    async show(req: Request, res: Response): Promise<void> {
        try {
            // On récupère les données de l'article correspondant grâce au service
            const post: PostDTO = await this.postService.getPostById(Number(req.params.id));
            res.render("post/post_detail", {post});
        } catch (error: any) {
            // Si une erreur a été déclenchée, on la gère
            res.status(404).render("404", {message: error.message});
        }
    }

    create(req: Request, res: Response): void {
        res.render("post/post_create", {errors: req.flash("errors")});
    }

    async store(req: Request, res: Response): Promise<void> {
        try {
            // On récupère les données du formulaire
            const {title, content} = req.body;

            // On demande au service de créer l'article à partir de ces données (et de la session)
            await this.postService.createPost(title, content, req.session.userId);
            res.redirect("/");
        } catch (error: any) {
            // Si une erreur est survenue lors de la validation des entités métier,
            // on la gère
            req.flash("errors", [error.message]);
            res.redirect("/posts/create");
        }
    }
}
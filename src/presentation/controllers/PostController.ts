import { Request, Response } from "express";
import PostService from "../../application/services/PostService";
import PostDTO from "../../application/dtos/PostDTO";

export class PostController {
    constructor(private postService: PostService) {}

    async index(req: Request, res: Response): Promise<void> {
        const posts: PostDTO[] = await this.postService.getAllPosts();
        res.render("post/post_list", { posts });
    }

    async show(req: Request, res: Response): Promise<void> {
        try {
            const post: PostDTO = await this.postService.getPostById(Number(req.params.id));
            res.render("post/post_detail", { post });
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }

    create(req: Request, res: Response): void {
        res.render("post/post_create", {errors: req.flash("errors")});
    }

    async store(req: Request, res: Response): Promise<void> {
        const {title, content} = req.body;

        if (!title || !content) {
            req.flash("errors", ["Le titre et le contenu sont obligatoires."]);
            res.redirect("/posts/create");
            return;
        }

        await this.postService.createPost(title, content, req.session.userId);
        res.redirect("/");
    }
}
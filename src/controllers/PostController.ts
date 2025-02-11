import { Request, Response } from "express";
import { PostRepository } from "../models/post/PostRepository";

export class PostController {
    constructor(private postRepository: PostRepository) {}

    async index(req: Request, res: Response): Promise<void> {
        const posts = await this.postRepository.getAllPosts();
        res.render("post/post_list", { posts });
    }

    async show(req: Request, res: Response): Promise<void> {
        const post = await this.postRepository.getPostById(Number(req.params.id));
        if (!post) {
            res.status(404).send("Post not found");
            return;
        }
        res.render("post/post_detail", { post });
    }

    create(req: Request, res: Response): void {
        res.render("post/post_create");
    }

    async store(req: Request, res: Response): Promise<void> {
        await this.postRepository.createPost(req.body);
        res.redirect("/");
    }
}
import PostRepositoryInterface from "../../domain/repositories/PostRepositoryInterface";
import Post from "../../domain/entities/Post";
import PostModel from "../models/PostModel";
import {PostMapper} from "../mappers/PostMapper";

/**
 * Implémentation du repository des articles
 */
export class PostRepository implements PostRepositoryInterface{
    async getAllPosts(): Promise<Post[]> {
        const posts: PostModel[] = await PostModel.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });

        // On transforme les objets de l'orm en objets métier puis on les retourne
        return posts.map(post => PostMapper.toDomain(post));
    }

    async getPostById(id: number): Promise<Post | null> {
        const post: PostModel | null = await PostModel.findByPk(id);

        // On transforme l'objet de l'orm en objet métier puis on le retourne
        return post ? PostMapper.toDomain(post) : null;
    }

    async createPost(title: string, content: string, userId: number): Promise<Post> {
        const post: PostModel = await PostModel.create({title, content, userId});

        // On transforme l'objet de l'orm en objet métier puis on le retourne
        return PostMapper.toDomain(post);
    }
}
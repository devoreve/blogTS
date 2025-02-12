import PostRepositoryInterface from "../../domain/repositories/PostRepositoryInterface";
import Post from "../../domain/entities/Post";
import PostModel from "../models/PostModel";
import {PostMapper} from "../mappers/PostMapper";

export class PostRepository implements PostRepositoryInterface{
    async getAllPosts(): Promise<Post[]> {
        const posts = await PostModel.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });

        return posts.map(post => PostMapper.toDomain(post));
    }

    async getPostById(id: number): Promise<Post | null> {
        const post = await PostModel.findByPk(id);

        return post ? PostMapper.toDomain(post) : null;
    }

    async createPost(title: string, content: string, userId: number): Promise<Post> {
        const post = await PostModel.create({title, content, userId});
        return PostMapper.toDomain(post);
    }
}
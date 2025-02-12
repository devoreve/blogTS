import PostRepositoryInterface from "../../domain/repositories/PostRepositoryInterface";
import Post from "../../domain/entities/Post";

export default class PostService {
    constructor(private postRepository: PostRepositoryInterface) {}

    async getAllPosts(): Promise<Post[]> {
        return await this.postRepository.getAllPosts();
    }

    async getPostById(id: number): Promise<Post | null> {
        return await this.postRepository.getPostById(id);
    }

    async createPost(title: string, content: string, userId: number): Promise<Post> {
        return await this.postRepository.createPost(title, content, userId);
    }
}
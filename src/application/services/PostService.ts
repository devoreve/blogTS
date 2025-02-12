import PostRepositoryInterface from "../../domain/repositories/PostRepositoryInterface";
import Post from "../../domain/entities/Post";
import PostDTO from "../dtos/PostDTO";

export default class PostService {
    constructor(private postRepository: PostRepositoryInterface) {}

    async getAllPosts(): Promise<PostDTO[]> {
        const posts: Post[] = await this.postRepository.getAllPosts();
        return posts.map(post => new PostDTO(post.id, post.title, post.content, post.createdAt, post.updatedAt))
    }

    async getPostById(id: number): Promise<PostDTO> {
        const post: Post | null = await this.postRepository.getPostById(id);

        if (!post) {
            throw new Error("L'article n'existe pas");
        }

        return new PostDTO(post.id, post.title, post.content, post.createdAt, post.updatedAt);
    }

    async createPost(title: string, content: string, userId: number): Promise<PostDTO> {
        const post: Post = await this.postRepository.createPost(title, content, userId);
        return new PostDTO(post.id, post.title, post.content, post.createdAt, post.updatedAt);
    }
}
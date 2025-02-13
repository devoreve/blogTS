import PostRepositoryInterface from "../../domain/repositories/PostRepositoryInterface";
import Post from "../../domain/entities/Post";
import PostDTO from "../dtos/PostDTO";

export default class PostService {
    constructor(private postRepository: PostRepositoryInterface) {}

    async getAllPosts(): Promise<PostDTO[]> {
        // On récupère les articles depuis le repository
        const posts: Post[] = await this.postRepository.getAllPosts();

        // On transforme les entités métier en objets DTO
        return posts.map(post => new PostDTO(post.id, post.title, post.content, post.createdAt))
    }

    async getPostById(id: number): Promise<PostDTO> {
        const post: Post | null = await this.postRepository.getPostById(id);

        // Si l'article n'existe pas on déclenche une erreur
        if (!post) {
            throw new Error("L'article n'existe pas");
        }

        // On transforme l'objet de l'orm en objet métier puis on le retourne
        return new PostDTO(post.id, post.title, post.content, post.createdAt);
    }

    async createPost(title: string, content: string, userId: number): Promise<PostDTO> {
        const post: Post = await this.postRepository.createPost(title, content, userId);
        return new PostDTO(post.id, post.title, post.content, post.createdAt);
    }
}
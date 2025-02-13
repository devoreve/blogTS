import Post from "../entities/Post";

/**
 * Les méthodes qui seront implémentées dans les classes concrètes
 */
export default interface PostRepositoryInterface {
    getAllPosts(): Promise<Post[]>;
    getPostById(id: number): Promise<Post | null>
    createPost(title: string, content: string, userId: number): Promise<Post>
}
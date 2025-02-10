import Post from "./Post";

export class PostRepository {
    async getAllPosts(): Promise<Post[]> {
        return await Post.findAll();
    }

    async getPostById(id: number): Promise<Post | null> {
        return await Post.findByPk(id);
    }

    async createPost(data: {title: string, content: string}): Promise<Post> {
        return await Post.create(data);
    }
}
import Post from "./Post";

export class PostRepository {
    async getAllPosts(): Promise<Post[]> {
        return await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    async getPostById(id: number): Promise<Post | null> {
        return await Post.findByPk(id);
    }

    async createPost(title: string, content: string, userId: number): Promise<Post> {
        return await Post.create({title, content, userId});
    }
}
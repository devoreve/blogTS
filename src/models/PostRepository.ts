import {Post} from "./Post";
import {pool} from "../config/database";

export class PostRepository {
    async getAllPosts(): Promise<Post[]> {
        const [rows] = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
        return (rows as any[]).map(row => new Post(row.id, row.title, row.content, row.created_at));
    }

    async getPostById(id: number): Promise<Post | null> {
        const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
        if ((rows as any[]).length === 0) return null;
        const row = (rows as any[])[0];
        return new Post(row.id, row.title, row.content, row.created_at);
    }

    async createPost(title: string, content: string): Promise<Post> {
        const [result] = await pool.query(
            "INSERT INTO posts (title, content, created_at) VALUES (?, ?, NOW())",
            [title, content]
        );
        return new Post((result as any).insertId, title, content, new Date());
    }
}
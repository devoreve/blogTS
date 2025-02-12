import Post from "../../domain/entities/Post";
import PostModel from "../models/PostModel";

export class PostMapper {
    static toDomain(postModel: PostModel): Post {
        return new Post(postModel.id, postModel.title, postModel.content, postModel.userId, postModel.createdAt, postModel.updatedAt);
    }

    static toPersistence(post: Post): any {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.userId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        };
    }
}
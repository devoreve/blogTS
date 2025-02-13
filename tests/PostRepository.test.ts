import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import PostModel from "../src/infrastructure/models/PostModel";
import {PostMapper} from "../src/infrastructure/mappers/PostMapper";
import Post from "../src/domain/entities/Post";
import { PostRepository } from "../src/infrastructure/repositories/PostRepository";

vi.mock("../src/infrastructure/models/PostModel");
vi.mock("../src/infrastructure/mappers/PostMapper");

describe("PostRepository", () => {
    let postRepository: PostRepository;

    beforeEach(() => {
        postRepository = new PostRepository();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("getAllPosts should return a list of posts", async () => {
        const mockPosts: Post[] = [
            new Post(1, "Post 1", "Contenu 1", 1),
            new Post(2, "Post 2", "Contenu 2", 1),
        ];

        const mockPostModels = mockPosts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.userId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        }));

        (PostModel.findAll as jest.Mock).mockResolvedValue(mockPostModels);
        (PostMapper.toDomain as jest.Mock).mockImplementation((postModel) => {
            return new Post(postModel.id, postModel.title, postModel.content, postModel.userId, postModel.createdAt, postModel.updatedAt);
        });

        const posts: Post[] = await postRepository.getAllPosts();

        expect(PostModel.findAll).toHaveBeenCalledTimes(1);
        expect(posts).toEqual(mockPosts);
    });

    test("getPostById should return a post when it exists", async () => {
        const mockPostModel = {
            id: 1,
            title: "Post 1",
            content: "Contenu 1",
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const mockPost: Post = new Post(
            mockPostModel.id,
            mockPostModel.title,
            mockPostModel.content,
            mockPostModel.userId,
            mockPostModel.createdAt,
            mockPostModel.updatedAt
        );

        (PostModel.findByPk as jest.Mock).mockResolvedValue(mockPostModel);
        (PostMapper.toDomain as jest.Mock).mockReturnValue(mockPost);

        const post: Post | null = await postRepository.getPostById(1);

        expect(PostModel.findByPk).toHaveBeenCalledWith(1);
        expect(PostMapper.toDomain).toHaveBeenCalledWith(mockPostModel);
        expect(post).toEqual(mockPost);
    });

    test("getPostById should return null when post is not found", async () => {
        (PostModel.findByPk as jest.Mock).mockResolvedValue(null);

        const post: Post | null = await postRepository.getPostById(999);

        expect(PostModel.findByPk).toHaveBeenCalledWith(999);
        expect(post).toBeNull();
    });

    test("createPost should return the created post", async () => {
        const postData = { title: "New Post", content: "Some content", userId: 1 };
        const mockPostModel = {
            id: 3,
            ...postData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const mockPost: Post = new Post(
            mockPostModel.id,
            mockPostModel.title,
            mockPostModel.content,
            mockPostModel.userId,
            mockPostModel.createdAt,
            mockPostModel.updatedAt
        );

        (PostModel.create as jest.Mock).mockResolvedValue(mockPostModel);
        (PostMapper.toDomain as jest.Mock).mockReturnValue(mockPost);

        const createdPost: Post = await postRepository.createPost(postData.title, postData.content, postData.userId);

        expect(PostModel.create).toHaveBeenCalledWith(postData);
        expect(PostMapper.toDomain).toHaveBeenCalledWith(mockPostModel);
        expect(createdPost).toEqual(mockPost);
    });
});
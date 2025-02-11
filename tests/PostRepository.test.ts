import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import Post from "../src/models/post/Post";
import { PostRepository } from "../src/models/post/PostRepository";

vi.mock("../src/models/post/Post");

describe("PostRepository", () => {
    let postRepository: PostRepository;

    beforeEach(() => {
        postRepository = new PostRepository();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("getAllPosts should return a list of posts", async () => {
        const mockPosts = [
            { id: 1, title: "Post 1", content: "Contenu 1", createdAt: new Date(), updatedAt: new Date() },
            { id: 2, title: "Post 2", content: "Contenu 2", createdAt: new Date(), updatedAt: new Date() },
        ];

        (Post.findAll as jest.Mock).mockResolvedValue(mockPosts);

        const posts = await postRepository.getAllPosts();

        expect(Post.findAll).toHaveBeenCalledTimes(1);
        expect(posts).toEqual(mockPosts);
    });

    test("getPostById should return a post when it exists", async () => {
        const mockPost = { id: 1, title: "Post 1", content: "Contenu 1", createdAt: new Date(), updatedAt: new Date() };

        (Post.findByPk as jest.Mock).mockResolvedValue(mockPost);

        const post = await postRepository.getPostById(1);

        expect(Post.findByPk).toHaveBeenCalledWith(1);
        expect(post).toEqual(mockPost);
    });

    test("getPostById should return null when post is not found", async () => {
        (Post.findByPk as jest.Mock).mockResolvedValue(null);

        const post = await postRepository.getPostById(999);

        expect(Post.findByPk).toHaveBeenCalledWith(999);
        expect(post).toBeNull();
    });

    test("createPost should return the created post", async () => {
        const postData = { title: "New Post", content: "Some content" };
        const mockCreatedPost = { id: 3, ...postData, createdAt: new Date(), updatedAt: new Date() };

        (Post.create as jest.Mock).mockResolvedValue(mockCreatedPost);

        const createdPost = await postRepository.createPost(postData);

        expect(Post.create).toHaveBeenCalledWith(postData);
        expect(createdPost).toEqual(mockCreatedPost);
    });
});
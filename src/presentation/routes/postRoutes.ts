import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { PostRepository } from "../../infrastructure/repositories/PostRepository";
import {authMiddleware} from "../middlewares/authMiddleware";
import PostService from "../../application/services/PostService";

const router = Router();
const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

router.get("/", postController.index.bind(postController));
router.get('/posts/create', authMiddleware, postController.create.bind(postController));
router.post("/posts/create", postController.store.bind(postController));
router.get("/posts/:id", postController.show.bind(postController));

export default router;
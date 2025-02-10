import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { PostRepository } from "../models/PostRepository";

const router = Router();
const postRepository = new PostRepository();
const postController = new PostController(postRepository);

router.get("/", postController.index.bind(postController));
router.get('/posts/create', postController.create.bind(postController));
router.post("/posts/create", postController.store.bind(postController));
router.get("/posts/:id", postController.show.bind(postController));

export default router;
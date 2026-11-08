import { Router } from "express";
import { createPost, deletePost, getAllPosts, updatePost }from "../controllers/post.controller.js";


const router = Router();

router.route("/create").post(createPost);
router.route("/getPosts").get(getAllPosts);
router.route("/update/:id").patch(updatePost);
router.route("/delete/:id").delete(deletePost);


// patch for update some data, put for replace whole data
export default router;
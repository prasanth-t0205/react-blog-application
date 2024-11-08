import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getUserPosts,
  getSinglePost,
  editPost,
  commentPost,
  deleteComment,
  getRandomPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/random", getRandomPosts);
router.get("/:id", getSinglePost);
router.get("/following/:username", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.put("/edit/:id", protectRoute, editPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/comment/:id", protectRoute, commentPost);
router.delete("/comment/:id/:commentId", protectRoute, deleteComment);

export default router;

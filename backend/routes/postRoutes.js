import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getUserPosts,
  getSinglePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/:id", getSinglePost);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);

export default router;

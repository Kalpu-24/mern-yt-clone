import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const Router = express.Router();
Router.post("/",verifyToken,addComment);
Router.delete("/:id",verifyToken,deleteComment)
Router.get("/:videoId",getComments);
export default Router;
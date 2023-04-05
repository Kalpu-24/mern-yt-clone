import express from "express";
import {deleteUser, dislikeVideo, getUser, likeVideo, subscribeUser, unsubscribeUser, updateUser} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const Router = express.Router();
//Update user
Router.put("/:id", verifyToken, updateUser);
//DELETE user
Router.delete("/:id",verifyToken, deleteUser);
//GET user
Router.get("/find/:id", getUser);
//SUBSCRIBE user
Router.put("/sub/:id",verifyToken, subscribeUser);
//UNSUBSCRIBE user
Router.put("/unsub/:id",verifyToken, unsubscribeUser);
//like a video
Router.put("/like/:videoId",verifyToken, likeVideo);
//dislike a video
Router.put("/dislike/:videoId",verifyToken, dislikeVideo);
export default Router;
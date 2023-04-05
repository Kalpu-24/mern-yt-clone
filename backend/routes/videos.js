import express from "express";
import {createVideo, updateVideo, deleteVideo, getVideo, addView, getRandomVideo, trendVideos, sub, tag, title} from "../controllers/video.js";
import {verifyToken} from "../verifyToken.js"

const Router = express.Router();
Router.post("/",verifyToken,createVideo);
Router.put("/:id",verifyToken,updateVideo);
Router.delete("/:id",verifyToken,deleteVideo);
Router.get("/find/:id",getVideo);
Router.post("/addView/:id",addView);
Router.get("/random",getRandomVideo);
Router.get("/trending",trendVideos);
Router.get("/sub",verifyToken,sub)
Router.get("/tags",tag)
Router.get("/search",title)
export default Router;
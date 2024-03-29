import { createError } from "../errors.js";
import Comments from "../models/Comments.js";
import Videos from "../models/Videos.js";

export const addComment = async (req, res,next) => {
    try{
        const newComment = new Comments({...req.body,userId:req.user.id})
        const save = await newComment.save()
        res.status(200).json(save)
    }catch(err){
        next(err);
    }
}

export const deleteComment = async (req, res,next) => {
    try{
        const comment = await Comments.findById(req.params.id);
        const video = await Videos.findById(comment.videoId);
        if(comment.userId === req.user.id || video.userId === req.user.id){
            await comment.deleteOne();
            res.status(500).json("deleted");
        }else{
            return createError("you can only delete your comment",401);
        }
    }catch(err){
        next(err);
    }
}

export const getComments = async (req, res,next) => {
    try{
        const comments = await Comments.find({videoId: req.params.videoId})
        res.status(200).json(comments)
    }catch(err){
        next(err);
    }
}
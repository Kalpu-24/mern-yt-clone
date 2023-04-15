import Videos from "../models/Videos.js"
import User  from "../models/User.js"
import { json } from "express";

export const createVideo = async (req, res, next) => {
    try{
        const newVideo = new Videos({userId: req.user.id, ...req.body});
        const video = await newVideo.save();
        res.status(200).json(video);
    }catch(err){
        next(err);
    }
}
export const updateVideo = async (req, res, next) => {
    try{
        const video = await Videos.findById(req.params.id);
        if(!video) return next(createError("Video not found", 404));
        if(video.userId !== req.user.id) return next(createError("You are not allowed to update this video", 403));
        const updated = await Videos.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true});
        res.status(200).json(updated);
    }catch(err){
        next(err);
    }
}
export const deleteVideo = async (req, res, next) => {
    try{
        const video = await Videos.findById(req.params.id);
        if(!video) return next(createError("Video not found", 404));
        if(video.userId !== req.user.id) return next(createError("You are not allowed to update this video", 403));
        await Videos.findByIdAndDelete(req.params.id);
        res.status(200).json("Video deleted successfully");
    }catch(err){
        next(err);
    }
}
export const getVideo = async (req, res, next) => {
    try{
        const video = await Videos.findById(req.params.id);
        if(!video) return next(createError("Video not found", 404));
        res.status(200).json(video);
    }catch(err){
        next(err);
    }
}

export const addView = async (req, res, next) => {
    try{
        await Videos.findByIdAndUpdate(req.params.id, {$inc: {views: 1}});
        res.status(200).json("View added");
    }catch(err){
        next(err);
    }
}

export const getRandomVideo = async (req, res, next) => {
    try{
        const ranv = await Videos.aggregate([{$sample: {size: 40}}]);
        res.status(200).json(ranv);
    }catch(err){
        next(err);
    }
}

export const trendVideos = async (req, res, next) => {
    try{
        const trend = await Videos.find().sort({views:-1});
        res.status(200).json(trend)
    }catch(err){
        next(err);
    }
}

export const sub = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        const subscribedUser = user.subcribedUsers;
        const list = Promise.all(
            subscribedUser.map(channelId => {
                return Videos.find({userId: channelId})
            })
        )
        res.status(200).json((await list).flat().sort((a,b)=>{return b.createdAt - a.createdAt}));
    }catch(err){
        next(err);
    }
}

export const tag = async (req,res,next)=>{
    const tags = req.query.tags.split(",");
    try{
        const videos = (await Videos.find({tags:{$in:tags}}).limit(20));
        const str = Array(videos)
        res.status(200).json(str[0]);
    }catch(err){
        next(err);
    }
}

export const title = async (req,res,next)=>{
    const title = req.query.title
    try{
        const videos = Videos.find({title:{$regex:title, $options :"i"}}).limit(20);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}
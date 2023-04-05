import User from "../models/User.js";
import { createError } from "../errors.js";
import mongoose from "mongoose";

export const updateUser = async (req, res,next) => {
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            res.status(200).json(updatedUser);
        }catch{
            return next(createError("Something went wrong", 500));
        }
    }else{
        return next(createError("You can update only your account", 403));
    }
}
export const deleteUser = async (req, res,next) => {
    if(req.params.id === req.user.id){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted User");
        }catch{
            return next(createError("Something went wrong", 500));
        }
    }else{
        return next(createError("You can delete only your account", 403));
    }
}
export const getUser = async (req, res,next) => {
    try{
        const user = await User.findById(req.params.id);
        const {password,__v,_id, updatedAt, createdAt,...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        next(err);
    }
}
export const subscribeUser = async (req, res,next) => {
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $push: {subcribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscibers: 1}
        })
        res.status(200).json("User has been subscribed");
    }catch(err){
        next(err);
    }
}
export const unsubscribeUser = async (req, res,next) => {
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull: {subcribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscibers: -1}
        })
        res.status(200).json("User has been Unsubscribed");
    }catch(err){
        next(err);
    }
}
export const likeVideo = async (req, res,next) => {
    try{
        
    }catch(err){
        next(err);
    }
}
export const dislikeVideo = async (req, res,next) => {
    try{
        
    }catch(err){
        next(err);
    }
}
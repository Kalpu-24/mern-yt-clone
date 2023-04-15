import User from "../models/User.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { createError } from "../errors.js"

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({ ...req.body, password: hash })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError("User not found", 404))
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError("Invalid credentials", 401))
        const token = jwt.sign({ id: user._id }, process.env.JWT)
        const { password, ...rest } = user._doc
        res.cookie("token", token, { expires: new Date(Date.now() + 2147483647), httpOnly: true }).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT)
            res.cookie("token", token, { httpOnly: true }).status(200).json(user._doc)
        }else{
            const newUser = new User({ ...req.body, fromGoogle: true })
            const savedUser = await newUser.save()
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT)
            res.cookie("token", token, { httpOnly: true }).status(200).json(savedUser._doc)
        }
    }catch (error) {
        next(error)
    }
}
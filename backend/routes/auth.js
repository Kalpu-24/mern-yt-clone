import express from "express";
import {signin, signup} from "../controllers/auth.js";

const Router = express.Router();
//SIGN UP
Router.post("/signup", signup);
//SIGN IN
Router.post("/signin", signin);
//GOOGLE
Router.post("/google", );
export default Router;
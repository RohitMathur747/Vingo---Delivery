import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth";
const userRouter = express.Router();

router.post("/current", isAuth, getCurrentUser);

export default userRouter;

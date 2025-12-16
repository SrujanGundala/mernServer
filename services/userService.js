import bcryptjs from "bcryptjs";
import { userModel } from "../db_connection/models.js";
import { ensureConnectionDB } from "../db_connection/db.js";
import { logger } from "../utils/logger.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";

/**
 * retrieve all users from DB
 */
export async function getAllUsers(_, res) {
  try {
    logger.info("enter:: get all users");
    await ensureConnectionDB();
    const users = (await userModel.find()) || [];
    logger.info("all users: " + users);
    res.send(users);
  } catch (error) {
    logger.error("get all users failed with error: " + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * retrieve a user by id
 */
export const getUserbyId = async (req, res) => {
  try {
    logger.info("enter:: get user by id");
    await ensureConnectionDB();
    const user = await userModel.findOne({ id: req.params.id });
    if (!user) {
      res
        .status(404)
        .json({ error: `No user found on this id: ${req.params.id}` });
    }
    logger.info("all users: " + user);
    res.send(user);
  } catch (error) {
    logger.error("get user by id failed with error: " + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
/**
 * create a user and save to DB
 */
export const createUser = async (req, res) => {
  try {
    logger.info("enter:: save the user to DB");
    await ensureConnectionDB();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ validation_errors: errors.array() });
    }
    const check_user = await userModel.findOne({ email: req.body.email });
    if (!check_user) {
      const salt = await bcryptjs.genSalt();
      const hash_password = await bcryptjs.hash(req.body.password, salt);
      const last_user = await userModel.findOne().sort({ id: -1 }).lean();
      const userId = last_user && last_user.id > 0 ? last_user.id + 1 : 1;
      const payload = {
        ...req.body,
        id: userId,
        password: hash_password,
      };
      const user = await userModel.create(payload);
      const request = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(request, config.get("jwt_token"), {
        expiresIn: 720000,
      });
      res
        .status(201)
        .json({ message: "user saved successfully", user, token: token });
    } else {
      res.status(400).json({ error: "user already exist with email" });
    }
  } catch (error) {
    logger.error("creating a user failed with error: " + error);
    res.status(500).json({ error: "internal server error" });
  }
};

import e from "express";
import { userModel } from "../db_connection/models.js";
import { ensureConnectionDB } from "../db_connection/db.js";
import { logger } from "../utils/logger.js";
import { user_sequence } from "../utils/increment.js";

const userController = e.Router();
/**
 * retrieve all users from DB
 */
userController.get("/", async (req, res) => {
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
});
/**
 * retrieve a user by id
 */
userController.get("/:id", async (req, res) => {
  try {
    logger.info("enter:: get user by id");
    await ensureConnectionDB();
    const seq = await user_sequence();
    console.log(seq.userId);
    const user = await userModel.findOne({ id: req.params.id });
    if (!user) {
      res
        .status(404)
        .json({ error: `No user found on this id: ${req.params.id}` });
    }
    res.send(user);
  } catch (error) {
    logger.error("get user by id failed with error: " + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/**
 * create a user and save to DB
 */
userController.post("/create", async (req, res) => {
  try {
    logger.info("enter:: save the user to DB");
    await ensureConnectionDB();
    const user = await userModel.create(req.body);
    if (!user) {
      res.status(404).json({ error: "error while saving the user" });
    } else {
      res.status(200).json({ message: "user saved successfully" });
    }
  } catch (error) {
    logger.error("get user by id failed with error: " + error);
    res.status(500).json({ error: "internal server error" });
  }
});

export default userController;

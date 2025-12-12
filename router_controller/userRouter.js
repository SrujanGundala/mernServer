import e from "express";
import { userModel } from "../db_connection/models.js";
import { ensureConnectionDB } from "../db_connection/db.js";
import { logger } from "../utils/logger.js";

const userController = e.Router();

userController.get("/", async (req, res) => {
  try {
    logger.info("entering get all users");
    await ensureConnectionDB();
    const users = (await userModel.find()) || [];
    logger.info("all users: " + users);
    res.send(users);
  } catch (error) {
    logger.error("get all users failed with error" + error);
  }
});

userController.get("/:id", async (req, res) => {
  try {
    logger.info("entering get user by id");
    await ensureConnectionDB();
    const user = await userModel.findOne({ id: req.params.id });
    if (!user) {
      res
        .status(404)
        .send({ error: `No user found on this id: ${req.params.id}` });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
    logger.error("get user by id failed with error " + error);
  }
});

export default userController;

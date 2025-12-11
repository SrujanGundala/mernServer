import e from "express";

const userController = e.Router();

userController.get("/", (req, res) => {
  res.send("user controller done");
});

export default userController;

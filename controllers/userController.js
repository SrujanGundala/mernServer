import express from "express";
import {
  createUser,
  getAllUsers,
  getUserbyId,
} from "../services/userService.js";
import { check } from "express-validator";

const userController = express.Router();

/**
 * retrieve all users from DB
 */
userController.get("/", getAllUsers);

/**
 * retrieve a user by id
 */
userController.get("/:id", getUserbyId);

/**
 * create a user and save to DB
 */

const validations = [
  check("name", "name is required").notEmpty(),
  check("email", "valid email is required").isEmail(),
  check("password", "password must be at leasr of 4 characters").isLength({
    min: 4,
  }),
];
userController.post("/create", validations, createUser);

export default userController;

import e from "express";
import userController from "./controllers/userController.js";
import config from "config";

const app = e();

app.use(e.json({ extended: false }));
/**
 * API ROUTER
 * 1.user router
 */
app.use("/v1/users", userController);

const PORT = process.env.PORT || config.get("local_port");

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}!`);
});

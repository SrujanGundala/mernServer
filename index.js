import e from "express";
import bodyParser from "body-parser";
import { NUM_CONSTANTS } from "./constants.js";
import userController from "./router_controller/userRouter.js";

const app = e();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1/users", userController);

app.listen(NUM_CONSTANTS.SERVER_PORT, () => {
  console.log(`server connect on port ${NUM_CONSTANTS.SERVER_PORT}!`);
});

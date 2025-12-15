import e from "express";
// import bodyParser from "body-parser";
import { NUM_CONSTANTS } from "./constants.js";
import userController from "./router_controller/userRouter.js";

const app = e();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(e.json({ extended: false }));
app.use("/v1/users", userController);

const PORT = process.env.PORT || NUM_CONSTANTS.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}!`);
});

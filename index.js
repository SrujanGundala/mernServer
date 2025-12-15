import e from "express";
import userController from "./router_controller/userRouter.js";
import config from "config";

const app = e();

app.use(e.json({ extended: false }));
app.use("/v1/users", userController);

const PORT = process.env.PORT || config.get("local_port");

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}!`);
});

import e from "express";
import bodyParser from "body-parser";
import { connectDB } from "./db_connection/db.js";
import { NUM_CONSTANTS } from "./constants.js";

const app = e();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.listen(NUM_CONSTANTS.SERVER_PORT, () => {
  console.log(`server connect on port ${NUM_CONSTANTS.SERVER_PORT}!`);
});

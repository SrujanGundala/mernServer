import e from "express";

const app = e();

const port = 8080;

app.listen(port, () => {
  console.log(`server connect on port ${port}!`);
});

import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ username: "Siddhanth", password: "M1a2s3y4e5r6@#" });
});

app.listen(port, () => {
  console.log(`App: Listening on port ${port}`);
});

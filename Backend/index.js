const express = require("express");
const signup = require("./api/signup");
const login = require("./api/login");
const addRecipe = require("./api/addRecipe");
const whoami = require("./api/whoami");
const getRecipes = require("./api/getRecipes");
const getRecipe = require("./api/getRecipe");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

let redisClient = redis.createClient({
  host: "localhost",
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (err) => {
  console.log("Could not connect!");
});

redisClient.on("connect", (err) => {
  console.log("Successfully connected!");
});

const app = express();
const port = process.env.EXPRESS_PORT;
app.use(
  session({
    name: "sess",
    store: new RedisStore({ client: redisClient, disableTouch: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "/uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
let flag = 0;
const fileTypeHandler = () => {
  flag = 1;
};

const filefilter = (req, file, cb) => {
  flag = 0;
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(fileTypeHandler(), false);
  }
};
const upload = multer({
  fileFilter: filefilter,
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

app.post("/v1/signup/", async (req, res) => {
  await signup(req.body, res);
});

app.post("/v1/login/", async (req, res) => {
  await login(req, res);
});

app.get("/v1/whoami/", async (req, res) => {
  await whoami(req.session, res);
});

app.post("/v1/addRecipe", upload.single("recipeImage"), async (req, res) => {
  if (flag === 0) {
    await addRecipe(req, res);
  } else {
    res.status(415).json({ Error: "only jpeg/jpg/png files are supported" });
  }
});

app.get("/v1/getRecipes", async (req, res) => {
  await getRecipes(req.session.userId, res);
});

app.get("/v1/getRecipe", async (req, res) => {
  await getRecipe(req.body.recipeId, res);
});

app.listen(port, () => {
  console.log(`App: Listening on port ${port}`);
});

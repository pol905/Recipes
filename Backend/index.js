const express = require("express");
const signup = require("./api/signup");
const login = require("./api/login");
const addRecipe = require("./api/addRecipe");
const whoami = require("./api/whoami");
const getRecipes = require("./api/getRecipes");
const getRecipe = require("./api/getRecipe");
const deleteRecipe = require("./api/deleteRecipe");
const updateRecipe = require("./api/updateRecipe");
const getAllRecipes = require("./api/getAllRecipes");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const logout = require("./api/logout");
require("dotenv").config();

let redisClient = redis.createClient({
  host: "localhost",
  port: process.env.REDIS_PORT,
}); // Connects to a redis instance running on host:port

redisClient.on("error", (err) => {
  console.log("Could not connect!");
});

redisClient.on("connect", (err) => {
  console.log("Successfully connected!");
});

const app = express();
const port = process.env.EXPRESS_PORT;
app.use(express.static(__dirname + "\\uploads")); // Exposing all static images uploaded by a user
app.use(
  // Creating a session Object which gets stored in redis memorystore
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
    secret: process.env.SESSION_SECRET, // Security Key
    resave: false,
    unset: "destroy",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //  sets the location for uploaded images
    const uploadPath = path.join(__dirname, "/uploads");
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // creates a date seperated filename for images that are uploaded
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
  // filters only specify image types
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
  // Creates a multer instance which can be used to handle file data in FormData
  fileFilter: filefilter,
  storage: storage,
  limits: {
    // Specifies Max File Size
    fileSize: 1024 * 1024 * 5,
  },
});

app.post("/v1/signup/", async (req, res) => {
  await signup(req.body.user, res);
});

app.post("/v1/login/", async (req, res) => {
  await login(req, res);
});

app.post("/v1/logout/", (req, res) => {
  logout(req);
  res.clearCookie("sess").sendStatus(200);
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

app.post("/v1/deleteRecipe", async (req, res) => {
  await deleteRecipe(req.body, res);
});

app.post("/v1/updateRecipe", upload.single("recipeImage"), async (req, res) => {
  await updateRecipe(req, res);
});

app.get("/v1/getAllRecipes", async (req, res) => {
  await getAllRecipes(res);
});

app.listen(port, () => {
  console.log(`App: Listening on port ${port}`);
});

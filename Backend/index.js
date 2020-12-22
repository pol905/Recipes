const express = require("express");
const signup = require("./api/signup");
const login = require("./api/login");
const whoami = require("./api/whoami");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

let redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("error", (err) => {
  console.log("Could not connect!");
});

redisClient.on("connect", (err) => {
  console.log("Successfully connected!");
});

const app = express();
const port = 3000;
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
    secret: "udhiewufhiwuefhiwuhiufhwiuehfiuh",
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/v1/signup/", async (req, res) => {
  await signup(req.body, res);
});

app.post("/v1/login/", async (req, res) => {
  await login(req, res);
});

app.get("/v1/whoami/", async (req, res) => {
  await whoami(req.session, res);
});

app.listen(port, () => {
  console.log(`App: Listening on port ${port}`);
});

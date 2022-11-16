const redis = require("redis");
const session = require("express-session");
const connectRedis = require("connect-redis");

const { REDIS_HOST, REDIS_PSW } = require("./config");

const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: 16626,
  },
  password: REDIS_PSW,
  legacyMode: true,
});

client.connect();

const RedisStore = connectRedis(session);

const redisSession = (app) => {
  app.use(
    session({
      store: new RedisStore({
        host: REDIS_HOST,
        port: 16626,
        client,
        ttl: 300,
      }),
      secret: "keyboard cat",
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 86400000, // 1 dia
      },
      rolling: true,
      resave: true,
      saveUninitialized: false,
    })
  );
};

module.exports = { redisSession };

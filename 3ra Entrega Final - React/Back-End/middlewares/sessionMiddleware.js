const passport = require("passport");

const {
  loginPassport,
  signUpPassport,
  serializeUser,
  deserializeUser,
} = require("./passportMiddleware");
const { redisSession } = require("../src/config/redisSessionConfig");

const sessionMiddleware = (app) => {
  redisSession(app);

  passport.use("login", loginPassport.localStrategy);
  passport.use("signup", signUpPassport.localStrategy);
  serializeUser();
  deserializeUser();

  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    req.session.touch();
    next();
  });
};

module.exports = { sessionMiddleware };

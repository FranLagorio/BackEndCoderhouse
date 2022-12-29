const passport = require("passport");

const {
  loginPassport,
  signUpPassport,
  serializeUser,
  deserializeUser,
  passportJwt,
} = require("./passportMiddleware");
const { redisSession } = require("../src/config/redisSessionConfig");

const sessionMiddleware = (app) => {
  redisSession(app);

  passport.use("login", loginPassport.localStrategy);
  passport.use("signup", signUpPassport.localStrategy);
  passport.use("jwt", passportJwt.strategy);

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

const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const Users = require("../models/userSchema");
const { logger } = require("../src/utils/loggers");
const {
  isValidPassword,
  createHash,
} = require("../src/utils/passwordsFunctions");

const loginPassport = {
  localStrategy: new LocalStrategy((username, password, done) => {
    Users.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        logger.info({ message: "User not found with username " + username });
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        logger.info({ message: "Invalid Password" });
        return done(null, false);
      }

      return done(null, user);
    });
  }),
};

const signUpPassport = {
  localStrategy: new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      Users.findOne({ username: username }, function (error, user) {
        if (error) {
          logger.error({ message: "Error in SingnUp: " + error });

          return done(error);
        }

        if (user) {
          logger.info({ message: "User already exists" });
          return done(null, false);
        }

        const { name, age, address, phone } = req.body;
        const newUser = {
          username: username,
          password: createHash(password),
          name,
          age,
          address,
          phone,
          image: req.file?.filename ? req.file.filename : "",
        };

        Users.create(newUser, (err, user) => {
          if (err) {
            logger.error({ message: "Error in Saving user: " + err });

            return done(err);
          }
          logger.info({ message: "User Registration succesful" });

          return done(null, user);
        });
      });
    }
  ),
};

const passportJwt = {
  strategy: new JWTStrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return next(error);
      }
    }
  ),
};

const serializeUser = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
};
const deserializeUser = () => {
  passport.deserializeUser((id, done) => {
    Users.findById(id, done);
  });
};

module.exports = {
  loginPassport,
  signUpPassport,
  serializeUser,
  deserializeUser,
  passportJwt,
};

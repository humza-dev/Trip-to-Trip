const passport = require("passport");
const localStorage = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcrypt");

passport.use(
  new localStorage(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await User.findOne({ email });

      !user
        ? done(null, user)
        : done(null, false, { message: "Incorrect email" });

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  done(null, user);
});

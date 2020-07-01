const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../database/models/User");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      //Confirmo si existe el correo del usuario
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Usuario no encontrado" });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrecta" });
        }
      }
    }
  )
);

//Recibo la id del usuario y un done
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id, function (err, user) {
    done(err, user);
  });
});

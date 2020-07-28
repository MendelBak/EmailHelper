const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const keys = require("../config/keys");
const mongoose = require("mongoose");
const prod = require("../config/prod");

// Models
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // user.id = mongo record ID, not googleID.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: keys.callbackUrlGithub,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ githubId: profile.id });
      console.log(profile);
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await new User({
          githubId: profile.id,
          givenName: profile._json.name,
          githubBio: profile._json.bio,
        })
          .save()
          .done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: keys.callbackUrlFacebook,
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // done object to close JS promise. null returns to the error param since we succeeded in getting the user, existingUser returns to the user param.
          done(null, existingUser);
        } else {
          new User({
            facebookId: profile.id,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.callbackUrlGoogle,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // done object to close JS promise. null returns to the error param since we succeeded in getting the user, existingUser returns to the user param.
        return done(null, existingUser);
      }

      const user = await new User({
        googleId: profile.id,
        familyName: profile.name.familyName,
        givenName: profile.name.givenName,
      })
        .save();
        done(null, user);
    }
  )
);

const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const GOOGLE_CLIENT_ID = '603986127974-gvboohkcithhjuio96qcmf46c9gkpt6n.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'qaqFSjDu3CUzNNZOMDaunLnp';

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
      done(null, user);
  });


passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://classroom-auth.herokuapp.com/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      //use the profile info to check if the user is registered is your db
      return done(null, profile);
  }
));
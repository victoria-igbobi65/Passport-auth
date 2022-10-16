require('dotenv').config()
const passport = require('passport')
const { ExtractJwt } = require('passport-jwt')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const User = require('../models/user')


//console.log(process.env.JWT_SECRET);


passport.use(
  new JWTstrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }, 
  async (token, done)=>{
    try{
        return done(null, token.user)
    }
    catch(error){
        done(error)

    }
  })
);


passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // ACCESSING MORE USER PASSED DETAILS FROM THE REQUEST BODY
        const user = await User.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);


passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
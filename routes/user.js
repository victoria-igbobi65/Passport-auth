const express = require('express')
const passport = require('passport')
const userController = require('../controller/user')
const userRouter = express.Router()

userRouter
  .route("/signup")
  .post(
    passport.authenticate("signup", { session: false }),
    userController.signup
  );

userRouter 
    .route('/login')
    .post(userController.login)

module.exports=userRouter
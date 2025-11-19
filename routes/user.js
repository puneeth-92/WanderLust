const express=require("express");
const router=express.Router({mergeParams:true});
const WrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const User=require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middlewares.js");
const userController=require("../controllers/userControllers.js")

router.route("/signup")
    .get(userController.signup)
    .post(WrapAsync(userController.createUser));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local",{
        failureFlash:true,
        failureRedirect:"/login"
    }),userController.loginUser);

router.get("/logout",userController.logoutUser);

module.exports=router;
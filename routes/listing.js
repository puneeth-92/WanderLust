const express=require("express");
const router=express.Router({mergeParams:true});
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});
const WrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middlewares.js");
const listingControllers=require("../controllers/listingControllers.js");


router.route("/")
    .get(WrapAsync(listingControllers.index))
    .post(isLoggedIn,upload.single('listing[image][url]'),validateListing,WrapAsync(listingControllers.createListing));

router.get("/new",isLoggedIn,listingControllers.renderNewForm);

router.route("/:id")
    .get(WrapAsync(listingControllers.showListing))
    .put(isLoggedIn,isOwner,upload.single('listing[image][url]'),validateListing,WrapAsync(listingControllers.updateListing))
    .delete(isLoggedIn,isOwner,WrapAsync(listingControllers.destroyListing));


router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(listingControllers.editListing));

module.exports=router;

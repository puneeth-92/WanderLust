const express=require("express");
const router=express.Router({mergeParams:true});
const WrapAsync=require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn, isReviewAuthor}=require("../middlewares.js");
const reviewController=require("../controllers/reviewControllers.js");

//create review
router.post("/",isLoggedIn,validateReview,WrapAsync(reviewController.createReview));

//Delete review 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,WrapAsync(reviewController.destroyReview));

module.exports=router;
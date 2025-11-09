const express=require("express");
const app=express();
const port=8080;
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const WrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
app.engine('ejs', ejsMate);



app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const mongo_url='mongodb://127.0.0.1:27017/WanderLust';
main()
.then((res)=>{
    console.log("DataBase connection is Scuccessfull");
}).catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect(mongo_url);
}

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        console.log(error);
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
}

app.get("/",(req,res)=>{
   res.send("in progress");
});

//view
app.get("/listings",WrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/listings.ejs",{allListings});
}));

//New 
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Create
app.post("/listings",validateListing,WrapAsync(async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

//show
app.get("/listings/:id",WrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//Edit

app.get("/listings/:id/edit",WrapAsync(async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//upate

app.put("/listings/:id",validateListing,WrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true });
    res.redirect(`/listings/${id}`);
}));

//delete
app.delete("/listings/:id",WrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// app.get("/testlisting",(req,res)=>{
//     let sampleListing =new Listing({
//         title:"My New Villa",
//         description:"By the Beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India"
//     });
//     // sampleListing.save();
//     console.log("Saved Successfully");
//     res.send("ok saved");
// });


//After all routes are over
//requesting for a page not found

app.use((req,res,next)=>{
    next(new ExpressError(404,"OOPS! Page Not Found!"));
});

//Error handler

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Error"}=err;
    if(statusCode===404){
        res.status(statusCode).render("pagenotfound.ejs",{message});
    }else{
        res.status(statusCode).render("error.ejs",{message});
    }
    
});

app.listen(port,()=>{
   
    console.log(`listening in port ${port}`);
});
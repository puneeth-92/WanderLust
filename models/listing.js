const mongoose=require("mongoose");
const Review = require("./reviews.js");
const dburl=process.env.ATLASDB_URL;
const Schema=mongoose.Schema;

main()
.then((res)=>{
    
}).catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect(dburl);
};

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        url:{type:String,
        default:"https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
        set:(v)=>{
            return v===""? "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069" : v
        }},
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{ $in : listing.reviews}}) ;
    }
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;

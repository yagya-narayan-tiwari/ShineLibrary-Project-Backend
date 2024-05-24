import mongoose from "mongoose";
import { DB_URL } from "../constants/DBconstant.js";
// import { DBURL } from "../constants/DBconstant.js";

export const dbConn =()=>{
    mongoose.connect(DB_URL)
    .then(()=>console.log('Connected to DB'))
    .catch((error)=>console.log(error))
}
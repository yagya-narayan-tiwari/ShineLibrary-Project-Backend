import { User } from "../models/UserModel.js"

// import { hash } from "bcrypt";
import { Seat } from "../models/SeatModel.js";
import { getLogInId } from "../middleware/VerifyToken.js";
import mongoose from "mongoose";

export const getSeats = async(req,res)=>{
    try {
        const getSeatData = await Seat.find();
        res.status(200).send(getSeatData);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getOneSeat = async(req,res)=>{
    try {
        // console.log(req.params.id);
        const getSeatData = await Seat.findOne({_id:req.params.id});
        res.status(200).send(getSeatData);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const insertSeat = async(req,res)=>{
    const enterData = new Seat({
        seatno:req.body.id,
        username:req.body.username,
        userid:req.body.userid,
        booked:req.body.booked
    })
    try { 
        const saveSeat = await enterData.save();
        res.send({message:'inserted seat into db',
            data:saveSeat
        });
        // res.send(saveSeat);
    } catch (error) {
        if (error.code == 11000) {
            res.status(400).send('Duplicate entry');
        } else {
            res.status(500).send(error);
        }
    }
}
export const bookSeat = async(req,res)=>{
    const seatNo = parseInt(req.params.seatno);
    // console.log('passed seat is',seatNo);
    try {
        const getSeatData = await Seat.findOne({seatno:seatNo});
        // console.log('getSeatData is',getSeatData);

        if (getSeatData.booked) {
            res.status(400).send({message:'Cant Booked Seat'});
        } else {
            // console.log('in else block');
            // const LogInId= parseInt(getLogInId());
            const LogInId = await getLogInId(req).catch(error => {
                res.status(error.status).send({ message: error.message });
                throw new Error('Authentication failed');
            });
            console.log('logInID is',LogInId);
            const getUserData = await User.findOne({_id:LogInId});
            console.log('getUSerData is',getUserData);
            const update = await Seat.findOneAndUpdate({seatno:seatNo},{
                username:getUserData.username,
                userid:LogInId,
                booked:true
            },{new:true})
            res.status(200).send({message:'Booked Seat'});

        }
    } catch (error) {
        res.status(500).send(error)
    }

}

export const getBookedSeats = async(req,res)=>{
    try {
        console.log('getbookedseat',req.params.id);
        const Uid = req.params.id;
        const userExist = await User.findOne({_id:Uid});
        const uname= userExist.username;

        const id=uname.toString();
        // const objectId = mongoose.Types.ObjectId(req.params.id);
        const getSeatData = await Seat.find({username:id});
        res.status(200).send(getSeatData);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const cancelBooking = async(req,res)=>{
    const seatNo = parseInt(req.params.seatno);
    try {
        // const getSeatData = await Seat.findOne({seatno:seatNo});
        const update = await Seat.findOneAndUpdate({seatno:seatNo},{
            username:'',
            userid:'',
            booked:false
        },{new:true})
        res.status(200).send({message:'Booking is cancel'});
    } catch (error) {
        res.status(500).send({message:'Error'});
    }
}
// export const updateUser = async(req,res)=>{
//     try {
//         const seatid = req.params.id;
//         const userExist = await Seat.findOne({_id:seatid});
//         console.log(userExist);
//         if (!userExist) {
//             return res.json({message:"user not found"})
//         }
//         const update = await Seat.findByIdAndUpdate({_id:seatid},req.body,{new:true})
//         res.json({message:'Updated the Details'})
//     } catch (error) {
//         res.json(error)
//     }
// }

// export const deleteUser = async(req,res)=>{
//     try {
//         await User.deleteOne({_id:req.params.id})
//         res.send({message:'user is deleted'})
//     } catch (error) {
//         res.send(error)
//     }
// }
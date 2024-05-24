import { User } from "../models/UserModel.js"
import bcrypt from 'bcryptjs';
// import {compareSync, hashSync} from bcrypt;
import jwt from 'jsonwebtoken';
import { getLogInId } from "../middleware/VerifyToken.js";


export const getUsers = async(req,res)=>{
    try {
        const getUserData = await User.find();
        res.status(200).send(getUserData);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getOneUser = async(req,res)=>{
    try {
        console.log(req.params.id);
        const getUserData = await User.findOne({_id:req.params.id});
        res.status(200).send(getUserData);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getCUser = async(req,res)=>{
    console.log('inside getcurrentuser');
    // const Cid = await getLogInId(req).catch(error => {
    //     res.status(error.status).send({ message: error.message });
    //     throw new Error('Authentication failed');})
    // console.log(Cid);
    try {
        console.log('inside getcurrentuser try');
        console.log(Cid);
        const getUserData = await User.findOne({_id:req.params.id});
        res.status(200).send(getUserData);
    } catch (error) {
        res.status(500).send(error)
    }
}


export const insertUser = async(req,res)=>{
    console.log(req.body);
    const password = req.body.password
    const encryptedPassword = bcrypt.hashSync(password,10);
    const enterData = new User({
        fullname:req.body.fullname,
        username:req.body.username,
        password:encryptedPassword,
        email:req.body.email,
        phone:req.body.phone
    })
    try { 
        const saveUser = await enterData.save();
        res.status(200).send({message:'inserted into db',
            data:saveUser
        });
        // res.send(saveUser);
    } catch (error) {
        if (error.code == 11000) {
            res.status(400).send('Duplicate entry');
        } else {
            res.status(500).send(error);
        }
        console.log(error);
    }
}

export const updateUser = async(req,res)=>{
    try {
        const Uid = req.params.id;
        const userExist = await User.findOne({_id:Uid});
        console.log(userExist);
        if (!userExist) {
            return res.status(400).send({message:"user not found"})
        }
        const update = await User.findByIdAndUpdate({_id:Uid},req.body,{new:true})
        res.status(200).send({message:'Updated the user'})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUser = async(req,res)=>{
    try {
        await User.deleteOne({_id:req.params.id})
        res.status(200).send({message:'user is deleted'})
    } catch (error) {
        res.status(500).send(error)
    }
}


export const userLogin = async(req,res) => {
    const {username, password} = req.body;
    const uname = username;
        try {
            // console.log(req.params.id);
            const userExist = await User.findOne({username:uname});
            console.log(userExist);
            if (!userExist) {
                return res.status(400).send({message:"user not found"})
            }
            else{
                const encryptedPassword = userExist.password; 
                // const newId = userExist._id.toString();
                // console.log('newidddd',newId);
                if (bcrypt.compareSync(password,encryptedPassword)) {
                     const token = jwt.sign({userId:userExist._id},'hello1234');
                     res.status(200).send({message:'Login successful',token:token,userid:userExist._id});
                }
                else{
                     res.status(400).send({message:'Invalid password for the mentioned username'});
                }
            }
        } catch (error) {
            res.status(500).send(error)
        }
        
} 
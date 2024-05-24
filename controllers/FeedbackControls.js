import { feedBack } from "../models/FeedbackModel.js";

export const addFeedback = async(req,res)=>{

    const enterData = new feedBack({
        name:req.body.name,
        feedback:req.body.feedback
    })
    try { 
        const saveFeedback = await enterData.save();
        res.send({message:'inserted feedback into db',
            data:saveFeedback
        });
        // res.send(saveSeat);
    } catch (error) {
        
            res.status(500).send(error);
        
    }

}
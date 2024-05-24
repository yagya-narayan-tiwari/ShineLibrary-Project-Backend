import express from 'express';
// import { feedBack } from '../models/FeedbackModel.js';
import { addFeedback } from '../controllers/FeedbackControls.js';

const fbRoute= express.Router();

fbRoute.post('/',addFeedback)

export default fbRoute;
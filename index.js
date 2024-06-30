import express from 'express';
import { dbConn } from './utility/DbUtil.js';
import UserRout from './routes/UserRoutes.js';
import SeatRout from './routes/SeatRoutes.js';
import cors from 'cors';
import fbRoute from './routes/feedBackRoutes.js';

const app = express();
const PORT = 8000;

app.use(cors(
    origin: ["https://shine-library.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
));
app.use(express.json());
app.use('/user',UserRout);
app.use('/seat',SeatRout);
app.use('/feedback',fbRoute);
app.listen(PORT,()=>{
    console.log(PORT);
    dbConn();
})

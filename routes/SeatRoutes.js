import express from 'express';
import { bookSeat, cancelBooking, getBookedSeats, getOneSeat, getSeats, insertSeat } from '../controllers/SeatControls.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const SeatRout = express.Router();

SeatRout.get('/get/',getSeats);
SeatRout.get('/get/:id',verifyToken,getOneSeat)
SeatRout.post('/',verifyToken,insertSeat);
SeatRout.get('/booking/:seatno',verifyToken,bookSeat)
SeatRout.get('/booked-info/:id',verifyToken,getBookedSeats);
SeatRout.delete('/booking/:seatno',verifyToken,cancelBooking);

// SeatRout.patch('/:id',updateUser)
// UserRout.delete('/:id',deleteUser)
export default SeatRout;
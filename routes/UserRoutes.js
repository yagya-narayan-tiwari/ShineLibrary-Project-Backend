import express from 'express';
// import { User } from '../models/UserModel';
import { deleteUser, getCUser, getOneUser, getUsers, insertUser, updateUser, userLogin } from '../controllers/UserControls.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const UserRout = express.Router();

UserRout.get('/',getUsers);
UserRout.get('/:id',verifyToken,getOneUser);
UserRout.get("/nid",verifyToken,getCUser);
UserRout.post('/',insertUser);
UserRout.patch('/:id',updateUser);
UserRout.delete('/:id',deleteUser);
UserRout.post('/login',userLogin);
export default UserRout;
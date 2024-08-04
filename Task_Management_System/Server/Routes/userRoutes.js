const express= require('express');

const{register,login, updatePassword, getCurrentUserInfo, getAllUsers}=require('../Controller/userController');
const { validateJWTToken } = require('../Middleware/authMiddleware');

const userRouter=express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/update-password',updatePassword);
userRouter.get('/getuser',validateJWTToken,getCurrentUserInfo);
userRouter.get('/getAllUser',validateJWTToken,getAllUsers);


module.exports=userRouter;
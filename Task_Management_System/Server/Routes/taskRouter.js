const express=require('express');

const taskRouter=express.Router();

const{createTask, getTasks, getTaskById, updateTask, deleteTask} = require("../Controller/taskController");
const { validateJWTToken } = require('../Middleware/authMiddleware');

taskRouter.post("/createTask",validateJWTToken,createTask);
taskRouter.get('/getTask',validateJWTToken,getTasks);
taskRouter.get('/getTaskById/:id',validateJWTToken,getTaskById);
taskRouter.patch('/updateTask/:id',validateJWTToken,updateTask);
taskRouter.delete('/deleteTask/:id',validateJWTToken,deleteTask);

module.exports=taskRouter;
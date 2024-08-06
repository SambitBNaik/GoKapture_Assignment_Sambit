const express= require('express');
const morgan=require('morgan');
const dotenv=require('dotenv');
const sequelize = require('./config/db');
const userRouter = require('./Routes/userRoutes');
const taskRouter = require('./Routes/taskRouter');

// configure dotenv
dotenv.config();
// rest object
const app=express();


app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/app/v1/users",userRouter);
app.use("/app/v1/tasks",taskRouter);


const startServer = async () => {
    try {
        // Sync all models
        await sequelize.sync({ alter: true }); // alter: true updates existing tables if needed

        // Start server
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server is listening on port ${process.env.PORT || 8080}`);
        });

        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

startServer();
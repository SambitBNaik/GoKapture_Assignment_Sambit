const express= require('express');
const morgan=require('morgan');
const dotenv=require('dotenv');
const sequelize = require('./config/db');
const userRouter = require('./Routes/userRoutes');

// configure dotenv
dotenv.config();
// rest object
const app=express();


app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/app/v1/users",userRouter);


sequelize.sync({ force: true }) // This will drop and recreate tables
    .then(() => {
        console.log("Database & tables created!");
        // Start server after syncing
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server is listening on port ${process.env.PORT || 8080}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });



import express from "express";

const app = express(); //create express app

app.use(express.json()); //parse incoming JSON requests

//Routes import userRoutes from "./routes/user.route.js";

import userRoutes from "./routes/user.route.js";


//routes declaration
app.use("/api/v1/users", userRoutes);




export default app;
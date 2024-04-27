const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const userRouter = require("./routes/userRoutes")
const { PORT, DB_URL } = require('./config/serverConfig');

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);

mongoose.connect(DB_URL).then(() => {
    console.log("Database connected")
});

app.listen(PORT, () => {
    console.log('Server running on Port:', PORT)
})

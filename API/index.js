
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
import vendorRoutes from './Routes/vendorRoutes.js';
import userRoutes from './Routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded ({extended : true}));

connectDb();

app.use("/vendor", vendorRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("API is running successfully 🚀");
});


const server = app.listen(PORT,'0.0.0.0', () => {
    console.log(`App is running on port number : ${PORT}`);
});

export default server;
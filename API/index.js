
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';  //for socket
import { Server } from 'socket.io';
import connectDb from './config/db.js';
import vendorRoutes from './Routes/vendorRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import otpRoutes from './Routes/otpRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

// Express App ko HTTP Server mein Wrap karein
const server = http.createServer(app);

// Socket.io Initialize karein
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Socket Logic (Updated for private chat)
io.on("connection", (socket) => {
    // User ek specific room join karega (e.g. orderId ya userId)
    socket.on("join_chat", (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on("send_message", (data) => {
        // Sirf us room ke logo ko message jayega
        io.to(data.room).emit("receive_message", data);
    });
});

app.use("/api/v1/otp", otpRoutes);
app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running successfully 🚀");
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`App & Socket running on port : ${PORT}`);
});

export default server;

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';  //for socket
import { Server } from 'socket.io';
import connectDb from './config/db.js';
import rootRouter from './Routes/mainRoutes.js';
import Message from './Models/messageModelSchema.js';
import Conversation from './Models/conversationModelSchema.js';

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

// Socket Logic
io.on("connection", (socket) => {
    // User ek specific room join karega (e.g. orderId ya userId)
    socket.on("join_chat", (conversationId) => {
        socket.join(conversationId);
        console.log(`User joined room: ${conversationId}`);
    });

    // Message bhejne ka logic
    socket.on("send_message", async (data) => {
        try {
            const { conversationId, senderId, receiverId, text, senderModel, receiverModel } = data;

            // 1. Database mein message save karein (Dynamic ref use karke)
            const newMessage = await Message.create({
                conversationId,
                senderId,
                senderModel,
                receiverId,
                receiverModel,
                text
            });

            // 2. Conversation ka lastMessage aur unreadCount update karein
            await Conversation.findByIdAndUpdate(conversationId, {
                lastMessage: {
                    text,
                    senderId,
                    senderModel
                },
                $inc: { [`unreadCount.${receiverId}`]: 1 } // Receiver ka count badhao
            });

            // 3. Room mein message emit karein taaki real-time dikhe
            io.to(conversationId).emit("receive_message", newMessage);
        } catch (err) {
            console.error("Socket error:", err);
        }
    });
});

app.use('/api/v1', rootRouter);

app.get("/", (req, res) => {
    res.send("API is running successfully 🚀");
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`App & Socket running on port : ${PORT}`);
});

export default server;
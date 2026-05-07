
import Conversation from '../Models/conversationModelSchema.js';
import Message from '../Models/messageModelSchema.js';

// 1. creat conversation, if exist then fetch 
export const accessChat = async (req, res) => {
    try {
        const { userId, vendorId } = req.body;

        if (!userId || !vendorId) {
            return res.status(400).json({
                success: false,
                message: "UserId and VendorId are required"
            });
        }

        // Check karo ki kya pehle se inka koi room/conversation hai
        let chat = await Conversation.findOne({
            participants: {
                $all: [
                    { $elemMatch: { participantId: userId, participantModel: 'User' } },
                    { $elemMatch: { participantId: vendorId, participantModel: 'Vendor' } }
                ]
            }
        });

        // Agar nahi hai toh naya Conversation banao
        if (!chat) {
            chat = await Conversation.create({
                participants: [
                    { participantId: userId, participantModel: 'User' },
                    { participantId: vendorId, participantModel: 'Vendor' }
                ],
                unreadCount: { [userId]: 0, [vendorId]: 0 }
            });
        }

        res.status(200).json({
            success: true,
            data: chat
        });

    } catch (err) {
        console.log("Error :", err)
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// 2. Ek specific chat ke saare messages fetch karna
export const fetchMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

        res.status(200).json({ success: true, data: messages });

    } catch (err) {
        console.log("Error :", err)
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// 3. Vendor ki saari active chats fetch karna (Sidebar ke liye)
export const getVendorChats = async (req, res) => {
    try {
        const { vendorId } = req.params;

        const chats = await Conversation.find({
            participants: {
                $elemMatch: { participantId: vendorId, participantModel: 'Vendor' }
            }
        }).sort({ updatedAt: -1 });

        // Manually populate User participants
        const populatedChats = await Promise.all(chats.map(async (chat) => {
            const chatObj = chat.toObject();

            // convert Map to plain object
            chatObj.unreadCount = Object.fromEntries(chat.unreadCount);

            const populated = await Promise.all(chatObj.participants.map(async (p) => {
                const Model = (await import(`../Models/${p.participantModel === 'User' ? 'userModelSchema' : 'vendorModelSchema'}.js`)).default;
                const data = await Model.findById(p.participantId).select('name profilePhoto storeName storeLogo');
                return { ...p, details: data };
            }));

            return { ...chatObj, participants: populated };
        }));

        res.status(200).json({
            success: true,
            data: populatedChats
        });

    } catch (err) {
        console.log("Error :", err)
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// 4. reset unread count when vendor opens a chat
export const resetUnreadCount = async (req, res) => {
    try {
        const { conversationId, userId } = req.body;

        await Conversation.findByIdAndUpdate(conversationId, {
            $set: { [`unreadCount.${userId}`]: 0 }
        });

        res.status(200).json({
            success: true
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
}
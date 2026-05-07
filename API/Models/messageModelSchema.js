
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true
        },

        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'senderModel' // Yeh niche wali field se reference lega
        },

        senderModel: {
            type: String,
            required: true,
            enum: ['User', 'Vendor'] // Yeh batayega ki sender User hai ya Vendor
        },

        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'receiverModel'
        },

        receiverModel: {
            type: String,
            required: true,
            enum: ['User', 'Vendor']
        },

        text: {
            type: String,
            required: true
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    
    { timestamps: true });

export default mongoose.model('Message', messageSchema);

import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                participantId: {
                    type: mongoose.Schema.Types.ObjectId,
                    refPath: 'participantModel'
                },

                participantModel: {
                    type: String,
                    enum: ['User', 'Vendor']
                }
            }
        ],

        lastMessage: {
            text: String,

            senderId: {
                type: mongoose.Schema.Types.ObjectId
            },

            senderModel: {
                type: String,
                enum: ['User', 'Vendor']
            },

            createdAt: {
                type: Date,
                default: Date.now
            }
        },

        unreadCount: {
            type: Map, // UserId as key and count as value
            of: Number,
            default: {}
        }

    },

    { timestamps: true });

export default mongoose.model('Conversation', conversationSchema);
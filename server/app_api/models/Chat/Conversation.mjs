import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;

export const ConversationSchema = new Schema({
    messages: {
        type: [Schema.Types.ObjectId],
        ref: 'Message'
    },
    participants: {
        type: [Schema.Types.ObjectId],
        ref: 'Fundraiser'
    }
});
ConversationSchema.plugin(timestamps);
ConversationSchema.index({ createdAt: 1, updatedAt: 1 });

export const Conversation = mongoose.model('Conversation', ConversationSchema);

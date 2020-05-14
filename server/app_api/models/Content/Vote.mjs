// const FundRaiser = require('../User/fundraiser');
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;

export const VoteSchema = new Schema({
    upVote: {
        type: Boolean,
        required: true
    },
    // timeOfVote: {
    //     type: Date,
    //     default: Date.now
    // },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Creator'
    }
});
VoteSchema.plugin(timestamps);
VoteSchema.index({ createdAt: 1, updatedAt: 1 });
export const Vote = mongoose.model("Vote", VoteSchema);

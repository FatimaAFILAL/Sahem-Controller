import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;


export const FundSchema = new Schema({
    funder: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    customer: {},
    charge: {}

});

FundSchema.plugin(timestamps);

FundSchema.index({ createdAt: 1, updatedAt: 1 });

export const Fund = mongoose.model("Fund", FundSchema);
// module.exports = {
//     Fund,
//     FundSchema
// };
import mongoose  from 'mongoose';
import timestamps from 'mongoose-timestamp';
const Schema = mongoose.Schema;

export const PersonalInformationSchema = new Schema({
    creator_id: {
        type:Schema.Types.ObjectId,
        ref:'Creator'
    },
    first_name: {
        type: String,
        required: true

    },
    last_name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true

    },
    address: {
        type: String,
        required: true
        
    }
});
PersonalInformationSchema.plugin(timestamps);
PersonalInformationSchema.index({ createdAt: 1, updatedAt: 1 });
export const PersonalInformation = mongoose.model('PersonalInformation', PersonalInformationSchema);
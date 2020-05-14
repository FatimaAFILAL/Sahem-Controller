import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;

export const PaymentInformationSchema = new Schema({

});
PaymentInformationSchema.plugin(timestamps);
PaymentInformationSchema.index({ createdAt: 1, updatedAt: 1 });
export const PaymentInformation = mongoose.model('PaymentInformation', PaymentInformationSchema);
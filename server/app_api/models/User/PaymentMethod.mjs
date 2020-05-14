import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;

export const PaymentMethodSchema = new Schema({

});
PaymentMethodSchema.plugin(timestamps);
PaymentMethodSchema.index({ createdAt: 1, updatedAt: 1 });
export const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);
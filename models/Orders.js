import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  totalAmount: { type: Number },
  totalItems: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "PENDING" },
  selectedAddress: { type: [Schema.Types.Mixed], required: true },
});
const virtuals = orderSchema.virtual("id");
virtuals.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Order = mongoose.model("Order", orderSchema);

export default Order;

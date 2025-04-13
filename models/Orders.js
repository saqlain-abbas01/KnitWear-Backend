import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "PENDING", required: true },
    selectedAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

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

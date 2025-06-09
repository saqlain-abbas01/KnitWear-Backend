import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: Buffer },
    role: { type: String, required: true, default: "user" },
    image: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    salt: Buffer,
  },
  {
    timestamps: true,
  }
);

const virtuals = userSchema.virtual("id");
virtuals.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const User = mongoose.model("User", userSchema);

export default User;

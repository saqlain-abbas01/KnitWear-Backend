import mongoose from "mongoose";
import { Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const virtuals = wishlistSchema.virtual("id");
virtuals.get(function () {
  return this._id;
});
wishlistSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const WishList = mongoose.model("WishList", wishlistSchema);

export default WishList;

import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      min: [1, "wrong min price"],
      max: [10000, "wrong max price"],
    },
    discountPercentage: {
      type: Number,
      min: [1, "wrong min discount"],
      max: [99, "wrong max discount"],
    },
    rating: {
      type: Number,
      min: [0, "wrong min rating"],
      max: [5, "wrong max price"], // Note: error message says "price" instead of "rating", might want to fix this
    },
    stock: { type: Number, min: [0, "wrong min stock"], default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: true },
    size: {
      type: String,
      enum: ["xs", "s", "m", "l", "xl"], // <-- allowed values
      required: true, // or false, depending if you want it mandatory
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const virtuals = productSchema.virtual("id");
virtuals.get(function () {
  return this._id;
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

productSchema.index({ title: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;

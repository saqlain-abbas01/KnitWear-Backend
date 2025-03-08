import mongoose from "mongoose";
import { Schema } from "mongoose";

const brandSchema = new Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});
const virtuals = brandSchema.virtual("id");
virtuals.get(function () {
  return this._id;
});
brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Brand = mongoose.model("Brand", brandSchema);

export default Brand;

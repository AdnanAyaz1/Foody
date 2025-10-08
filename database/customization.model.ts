import mongoose, { Document, Schema } from "mongoose";

export interface ICustomization extends Document {
  name: string;
  price: number;
}

const customizationSchema = new Schema<ICustomization>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Customization =
  mongoose?.models?.Customization ||
  mongoose.model<ICustomization>("Customization", customizationSchema);

export default Customization;

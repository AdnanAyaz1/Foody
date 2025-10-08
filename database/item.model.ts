import mongoose, { Document, Schema, Types } from "mongoose";

export interface IItem extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  ratings: number;
  category: Types.ObjectId; // Reference to Category
  customizations: Types.ObjectId[];
}

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    ratings: { type: Number, default: 0 },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // link to Category model
      required: true,
    },
    customizations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Customization", // link to Customization model
      },
    ],
  },
  { timestamps: true }
);

const Item = mongoose?.models?.Item || mongoose.model<IItem>("Item", itemSchema);

export default Item;

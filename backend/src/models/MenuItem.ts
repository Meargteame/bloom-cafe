import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isAvailable: boolean;
  preparationTime?: string;
  calories?: string;
  temperature?: 'hot' | 'iced' | 'both';
  dietary?: string[];
  image?: string;
}

const MenuItemSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: String },
    calories: { type: String },
    temperature: { type: String, enum: ['hot', 'iced', 'both'] },
    dietary: [{ type: String }],
    image: { type: String },
  },
  { timestamps: true }
);

export const MenuItemModel = mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

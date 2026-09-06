import mongoose, { Schema, Document } from 'mongoose';

export interface ICafeInfo extends Document {
  name: string;
  tagline: string;
  address: string;
  hours: string;
  phone: string;
  wifiName: string;
  wifiPassword: string;
  announcement: string;
  currencySymbol: string;
  tableCount: number;
}

const CafeInfoSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    address: { type: String, required: true },
    hours: { type: String, required: true },
    phone: { type: String, required: true },
    wifiName: { type: String, required: true },
    wifiPassword: { type: String, required: true },
    announcement: { type: String, required: true },
    currencySymbol: { type: String, required: true, default: ' ብር' },
    tableCount: { type: Number, required: true, default: 20 },
  },
  { timestamps: true }
);

export const CafeInfoModel = mongoose.model<ICafeInfo>('CafeInfo', CafeInfoSchema);

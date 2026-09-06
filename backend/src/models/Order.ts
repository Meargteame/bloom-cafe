import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  id: string;
  tableNumber: string;
  items: Array<{
    item: Record<string, any>;
    quantity: number;
    notes?: string;
  }>;
  totalAmount: number;
  status: 'received' | 'preparing' | 'served' | 'completed' | 'cancelled';
  createdAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    tableNumber: { type: String, required: true },
    items: [
      {
        item: { type: Schema.Types.Mixed, required: true },
        quantity: { type: Number, required: true, default: 1 },
        notes: { type: String },
      },
    ],
    totalAmount: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['received', 'preparing', 'served', 'completed', 'cancelled'],
      default: 'received',
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

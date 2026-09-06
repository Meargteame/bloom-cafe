import mongoose from 'mongoose';
import { MenuItemModel } from '../models/MenuItem';
import { CafeInfoModel } from '../models/CafeInfo';
import { initialCafeInfo, initialMenuItems } from '../data/bloomData';

export async function connectMongoDB(): Promise<boolean> {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.log('ℹ️ MONGODB_URI not set. Using JSON file store baseline.');
    return false;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('🍃 MongoDB Atlas Connected Successfully!');

    // Auto-seed Menu Items if collection is empty
    const count = await MenuItemModel.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial 60+ Bloom Cafe menu items to MongoDB...');
      await MenuItemModel.insertMany(initialMenuItems);
      console.log('✅ Menu items seeded successfully!');
    }

    // Auto-seed Cafe Info if empty
    const infoCount = await CafeInfoModel.countDocuments();
    if (infoCount === 0) {
      await CafeInfoModel.create(initialCafeInfo);
      console.log('✅ Cafe info seeded successfully!');
    }

    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    return false;
  }
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CafeInfo, CafeMenuItem } from '../types';
import { initialCafeInfo, initialMenuItems } from './bloomData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface OrderRecord {
  id: string;
  tableNumber: string;
  items: {
    item: CafeMenuItem;
    quantity: number;
    notes?: string;
  }[];
  totalAmount: number;
  status: 'received' | 'preparing' | 'served' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface DBData {
  menuItems: CafeMenuItem[];
  cafeInfo: CafeInfo;
  orders: OrderRecord[];
}

const DB_PATH = path.join(__dirname, 'db.json');

function initDB(): DBData {
  if (!fs.existsSync(DB_PATH)) {
    const initialData: DBData = {
      menuItems: initialMenuItems,
      cafeInfo: initialCafeInfo,
      orders: [],
    };
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw) as DBData;
  } catch (err) {
    console.error('Error reading db.json, resetting to initial baseline data', err);
    const initialData: DBData = {
      menuItems: initialMenuItems,
      cafeInfo: initialCafeInfo,
      orders: [],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

let dbData: DBData = initDB();

function saveDB() {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db.json:', err);
  }
}

export const db = {
  getMenu: (): CafeMenuItem[] => {
    return dbData.menuItems;
  },
  setMenu: (items: CafeMenuItem[]) => {
    dbData.menuItems = items;
    saveDB();
  },
  addMenuItem: (item: CafeMenuItem) => {
    dbData.menuItems.unshift(item);
    saveDB();
    return item;
  },
  updateMenuItem: (updated: CafeMenuItem) => {
    dbData.menuItems = dbData.menuItems.map((item) =>
      item.id === updated.id ? updated : item
    );
    saveDB();
    return updated;
  },
  deleteMenuItem: (id: string) => {
    dbData.menuItems = dbData.menuItems.filter((item) => item.id !== id);
    saveDB();
  },
  toggleAvailability: (id: string) => {
    let toggled: CafeMenuItem | null = null;
    dbData.menuItems = dbData.menuItems.map((item) => {
      if (item.id === id) {
        toggled = { ...item, isAvailable: !item.isAvailable };
        return toggled;
      }
      return item;
    });
    saveDB();
    return toggled;
  },
  getCafeInfo: (): CafeInfo => {
    return dbData.cafeInfo;
  },
  updateCafeInfo: (info: CafeInfo) => {
    dbData.cafeInfo = info;
    saveDB();
    return info;
  },
  getOrders: (): OrderRecord[] => {
    return dbData.orders;
  },
  addOrder: (tableNumber: string, items: { item: CafeMenuItem; quantity: number; notes?: string }[], totalAmount: number): OrderRecord => {
    const newOrder: OrderRecord = {
      id: `ord-${Date.now()}`,
      tableNumber,
      items,
      totalAmount,
      status: 'received',
      createdAt: new Date().toISOString(),
    };
    dbData.orders.unshift(newOrder);
    saveDB();
    return newOrder;
  },
  updateOrderStatus: (id: string, status: OrderRecord['status']) => {
    let updated: OrderRecord | null = null;
    dbData.orders = dbData.orders.map((o) => {
      if (o.id === id) {
        updated = { ...o, status };
        return updated;
      }
      return o;
    });
    saveDB();
    return updated;
  },
  resetDefaults: () => {
    dbData = {
      menuItems: initialMenuItems,
      cafeInfo: initialCafeInfo,
      orders: [],
    };
    saveDB();
    return dbData;
  },
};

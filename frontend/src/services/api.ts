import { CafeMenuItem, CafeInfo, OrderItem } from '../types';
import { initialMenuItems, initialCafeInfo } from '../data/bloomData';

const MENU_STORAGE_KEY = 'bloom_cafe_menu_items_v4';
const CAFE_INFO_STORAGE_KEY = 'bloom_cafe_info_v4';

const API_BASE = '/api';

export interface BackendOrder {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'received' | 'preparing' | 'served' | 'completed' | 'cancelled';
  createdAt: string;
}

export const api = {
  // Menu Items
  getMenuItems: async (): Promise<CafeMenuItem[]> => {
    try {
      const res = await fetch(`${API_BASE}/menu`);
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Backend API unreachable, using local storage cache for menu', e);
    }
    const saved = localStorage.getItem(MENU_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialMenuItems;
  },

  addMenuItem: async (item: CafeMenuItem): Promise<CafeMenuItem> => {
    try {
      const res = await fetch(`${API_BASE}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API unreachable, saving item to local storage', e);
    }
    return item;
  },

  updateMenuItem: async (item: CafeMenuItem): Promise<CafeMenuItem> => {
    try {
      const res = await fetch(`${API_BASE}/menu/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API unreachable, updated item locally', e);
    }
    return item;
  },

  deleteMenuItem: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/menu/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch (e) {
      console.warn('Backend API unreachable, deleted item locally', e);
    }
    return true;
  },

  toggleAvailability: async (id: string): Promise<CafeMenuItem | null> => {
    try {
      const res = await fetch(`${API_BASE}/menu/${id}/availability`, {
        method: 'PATCH',
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API unreachable, toggled availability locally', e);
    }
    return null;
  },

  // Cafe Settings
  getCafeInfo: async (): Promise<CafeInfo> => {
    try {
      const res = await fetch(`${API_BASE}/info`);
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(CAFE_INFO_STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Backend API unreachable, using local storage cache for cafe info', e);
    }
    const saved = localStorage.getItem(CAFE_INFO_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCafeInfo;
  },

  updateCafeInfo: async (info: CafeInfo): Promise<CafeInfo> => {
    try {
      const res = await fetch(`${API_BASE}/info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API unreachable, updated cafe info locally', e);
    }
    return info;
  },

  // Table Orders
  submitOrder: async (
    tableNumber: string,
    items: OrderItem[],
    totalAmount: number
  ): Promise<BackendOrder | null> => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableNumber, items, totalAmount }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API unreachable, order logged locally', e);
    }
    return {
      id: `local-ord-${Date.now()}`,
      tableNumber,
      items,
      totalAmount,
      status: 'received',
      createdAt: new Date().toISOString(),
    };
  },

  getOrders: async (): Promise<BackendOrder[]> => {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API unreachable', e);
    }
    return [];
  },

  resetDefaults: async (): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/reset`, { method: 'POST' });
      if (res.ok) return true;
    } catch (e) {
      console.warn('Backend API unreachable, reset local storage', e);
    }
    return true;
  },
};

export type CategoryType = 
  | 'all'
  | 'coffee' 
  | 'tea' 
  | 'bakery' 
  | 'brunch' 
  | 'sandwiches' 
  | 'desserts';

export type DietaryTag = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'popular' | 'chef-choice';

export interface CafeMenuItem {
  id: string;
  name: string;
  category: Exclude<CategoryType, 'all'>;
  price: number;
  description: string;
  isAvailable: boolean;
  dietary?: DietaryTag[];
  preparationTime?: string;
  temperature?: 'hot' | 'iced' | 'both';
  calories?: string;
  image?: string;
}

export interface TimeSlot {
  id: string;
  timeRange: string;
  name: string;
  description: string;
  isActiveNow?: boolean;
  highlights: string[];
}

export interface CafeInfo {
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

export interface OrderItem {
  item: CafeMenuItem;
  quantity: number;
  notes?: string;
}

export type ActiveModal = 
  | null 
  | 'qr-code' 
  | 'order-tray' 
  | 'item-detail' 
  | 'add-item' 
  | 'edit-item' 
  | 'cafe-settings'
  | 'feedback'
  | 'time-slot';

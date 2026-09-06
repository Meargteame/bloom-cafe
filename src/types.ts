export type ActiveModal = 
  | null 
  | 'menu' 
  | 'drinks' 
  | 'desserts' 
  | 'buffet' 
  | 'whats-on' 
  | 'catering' 
  | 'visit' 
  | 'cake-order' 
  | 'feedback' 
  | 'book-table' 
  | 'directions';

export interface TimeSlot {
  id: string;
  timeRange: string;
  name: string;
  description: string;
  isActiveNow?: boolean;
  highlights: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  amharicName?: string;
  category: 'breakfast' | 'buffet' | 'coffee' | 'shawarma' | 'desserts' | 'mains' | 'drinks';
  price: string;
  description: string;
  tag?: string;
  dietary?: 'vegetarian' | 'fasting' | 'popular' | 'chef-special';
}

export interface ContactInfo {
  phone1: string;
  phone2: string;
  email: string;
  location: string;
  landmark: string;
  hours: string;
}

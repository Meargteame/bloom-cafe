import { TimeSlot, MenuItem } from '../types';

export const TIME_SLOTS: TimeSlot[] = [
  {
    id: 'morning',
    timeRange: '05:00 — 11:00',
    name: 'Morning',
    description: 'Breakfast from five. Teff pancakes, chechebsa, full English, and the first macchiato of the day.',
    highlights: ['Chechebsa with honey & nitir qibe', 'Teff flour golden pancakes', 'Double macchiato', 'Full English plate']
  },
  {
    id: 'midday',
    timeRange: '11:00 — 15:00',
    name: 'Midday',
    description: 'The lunch buffet, Monday to Friday. Fasting and non-fasting laid out side by side.',
    highlights: ['Daily fresh injera', 'Tender beef & lamb tibs', 'Fasting shiro & misir wot', 'Seasonal salad bar']
  },
  {
    id: 'afternoon',
    timeRange: '15:00 — 17:00',
    name: 'Afternoon',
    description: 'The quiet hours. Syphon, V60 and moka pot, a slice of something, and a table nobody rushes you from.',
    highlights: ['Single-origin Yirgacheffe & Sidamo', 'Syphon & V60 pour-over', 'San Sebastian & Torta cakes', 'Quiet workspace vibe']
  },
  {
    id: 'evening',
    timeRange: '17:00 — 23:00',
    name: 'Evening',
    isActiveNow: true,
    description: 'Dinner, and the shawarma station fires up at five. Thursdays, live jazz from five.',
    highlights: ['Charcoal carved shawarma', 'Live Jazz every Thursday (5pm)', 'Chef signature grills', 'Artisan mocktails & craft sodas']
  },
  {
    id: 'late',
    timeRange: '23:00 — 05:00',
    name: 'Late',
    description: 'Still open. A hot plate and a real coffee at three in the morning, when nowhere else in Wollo Sefer is.',
    highlights: ['Midnight hot kitchen specials', 'Freshly steamed macchiato', 'Late night shawarma wrap', 'Cozy 24/7 security & parking']
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: 'b1',
    name: 'Chechebsa with Spiced Butter & Honey',
    amharicName: 'ጨጨብሳ',
    category: 'breakfast',
    price: '320 ETB',
    description: 'Pan-toasted torn flatbread cooked in fragrant Ethiopian spiced butter (nitir qibe), berbere, and organic highland honey.',
    dietary: 'popular'
  },
  {
    id: 'b2',
    name: 'IDDO Signature Teff Pancakes',
    category: 'breakfast',
    price: '380 ETB',
    description: 'Fluffy ancient-grain teff pancakes topped with wild forest berries, whipped mascarpone, and pure acacia syrup.',
    dietary: 'vegetarian'
  },
  {
    id: 'b3',
    name: 'Full Addis Breakfast',
    category: 'breakfast',
    price: '450 ETB',
    description: 'Eggs your way, grilled spicy beef sausage, sauteed button mushrooms, baked beans, roasted tomato, and toasted sourdough.',
    dietary: 'popular'
  },
  {
    id: 'b4',
    name: 'Fasting Special: Siljo & Enjera Bites',
    amharicName: 'ስልጆ',
    category: 'breakfast',
    price: '290 ETB',
    description: 'Traditional fermented legume & mustard puree served warm with freshly rolled injera rolls.',
    dietary: 'fasting'
  },

  // Lunch Buffet
  {
    id: 'buf1',
    name: 'Grand Daily Lunch Buffet (All You Can Eat)',
    category: 'buffet',
    price: '650 ETB',
    description: 'Monday to Friday, 11:00 to 15:00. Rich assortment of 12+ fasting and non-fasting Ethiopian classics, fresh injera, warm soup, salad bar, and dessert.',
    dietary: 'chef-special',
    tag: 'Mon - Fri 11am-3pm'
  },
  {
    id: 'buf2',
    name: 'Special Non-Fasting Spread: Doro Wot & Key Tibs',
    category: 'buffet',
    price: 'Included in Buffet',
    description: 'Slow-simmered chicken in spicy berbere gravy with hardboiled egg, accompanied by tender pan-fried beef tibs.',
    dietary: 'popular'
  },
  {
    id: 'buf3',
    name: 'Fasting Spread: Shiro Tegabino & Misir Kik',
    category: 'buffet',
    price: 'Included in Buffet',
    description: 'Clay pot bubbling chickpea stew with garlic, spicy red lentils, sauteed collard greens (gomen), and beet salad.',
    dietary: 'fasting'
  },

  // Shawarma
  {
    id: 'sh1',
    name: 'Classic Spit-Roasted Beef Shawarma',
    category: 'shawarma',
    price: '390 ETB',
    description: 'Thinly carved spiced beef brisket wrapped in hand-stretched saj bread with tomato, pickled turnip, biwaz salad, and homemade tahini.',
    dietary: 'popular',
    tag: 'Fired from 5pm'
  },
  {
    id: 'sh2',
    name: 'IDDO Garlic Chicken Shawarma',
    category: 'shawarma',
    price: '360 ETB',
    description: 'Marinated spit-roasted chicken thigh, Lebanese toum garlic whip, crisp french fries, and wild pickled cucumber.',
    dietary: 'popular',
    tag: 'Fired from 5pm'
  },
  {
    id: 'sh3',
    name: 'Shawarma Platter Deluxe',
    category: 'shawarma',
    price: '520 ETB',
    description: 'Generous serving of sliced beef or chicken shawarma with spiced rice, hummus, tabbouleh, garlic sauce, and fresh pita bread.',
    dietary: 'chef-special'
  },

  // Coffee & Drinks
  {
    id: 'c1',
    name: 'Classic Addis Macchiato',
    category: 'coffee',
    price: '110 ETB',
    description: 'Velvety micro-foamed local milk layered over a rich double ristretto of roasted Yirgacheffe beans.',
    dietary: 'popular'
  },
  {
    id: 'c2',
    name: 'Pour-Over V60 / Syphon (Yirgacheffe Grade 1)',
    category: 'coffee',
    price: '180 ETB',
    description: 'Jasmine floral aroma, bright bergamot citrus notes, and silky tea-like finish brewed fresh at your table.',
    dietary: 'chef-special'
  },
  {
    id: 'c3',
    name: 'Traditional Jebena Buna Ceremony',
    category: 'coffee',
    price: '160 ETB',
    description: 'Clay pot brewed Ethiopian coffee roasted on site, served with smoky frankincense and popcorn.',
    dietary: 'popular'
  },
  {
    id: 'c4',
    name: 'Fresh Mango & Avocado Spris',
    category: 'drinks',
    price: '190 ETB',
    description: 'Layered fresh tropical mango and creamy avocado smoothie served with fresh lime wedge.',
    dietary: 'popular'
  },
  {
    id: 'c5',
    name: 'Iced Hibiscus & Ginger Quencher',
    category: 'drinks',
    price: '150 ETB',
    description: 'Cold-steeped ruby hibiscus flowers with crushed wild ginger and raw honey over crushed ice.',
    dietary: 'vegetarian'
  },

  // Desserts & Cakes
  {
    id: 'd1',
    name: 'IDDO Celebration Torta Cake (Whole / Slice)',
    category: 'desserts',
    price: '280 ETB / Slice (4,200 ETB Whole)',
    description: 'Signature layered sponge with golden biscuit crumb, silky chantilly cream, strawberry compote, and chocolate plaque.',
    dietary: 'popular',
    tag: 'Enkutatash Favorite'
  },
  {
    id: 'd2',
    name: 'Basque Burnt Cheesecake',
    category: 'desserts',
    price: '310 ETB',
    description: 'Caramelized exterior with molten creamy center, served with berry coulis.',
    dietary: 'popular'
  },
  {
    id: 'd3',
    name: 'Crisp Artisan Mille-Feuille',
    category: 'desserts',
    price: '270 ETB',
    description: 'Layers of golden puff pastry with Tahitian vanilla bean pastry cream and powdered sugar.',
    dietary: 'vegetarian'
  }
];

export const LIVE_TICKER_ITEMS = [
  { text: 'Buffet returns Monday', highlight: false },
  { text: 'Shawarma station firing', highlight: true, dotColor: '#22c55e' },
  { text: 'Jazz Night Thursdays, 5pm', highlight: false },
  { text: 'Open now · 24 hours', highlight: true, dotColor: '#22c55e' },
  { text: 'Sunday, 6 September 2026', highlight: false },
  { text: 'Semay Tower, Bole Wollo Sefer', highlight: false }
];

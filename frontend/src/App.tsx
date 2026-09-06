import React, { useState, useEffect } from 'react';
import { CafeMenuItem, CafeInfo, OrderItem, TimeSlot } from './types';
import { initialMenuItems, initialCafeInfo, initialTimeSlots } from './data/bloomData';
import { api } from './services/api';

// Components in the Permanent UI Design System
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatusTicker } from './components/StatusTicker';
import { HourTableSection } from './components/HourTableSection';
import { DigitalMenu } from './components/DigitalMenu';
import { PromoCarousel } from './components/PromoCarousel';
import { FindUsSection } from './components/FindUsSection';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';

// Modals
import { QRCodeModal } from './components/QRCodeModal';
import { OrderTrayDrawer } from './components/OrderTrayDrawer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { AdminPortal } from './components/AdminPortal';

const MENU_STORAGE_KEY = 'bloom_cafe_menu_items_v4';
const CAFE_INFO_STORAGE_KEY = 'bloom_cafe_info_v4';

export default function App() {
  // State: Menu Items
  const [menuItems, setMenuItems] = useState<CafeMenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(MENU_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading menu from localStorage', e);
    }
    return initialMenuItems;
  });

  // State: Cafe Info
  const [cafeInfo, setCafeInfo] = useState<CafeInfo>(() => {
    try {
      const saved = localStorage.getItem(CAFE_INFO_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cafe info from localStorage', e);
    }
    return initialCafeInfo;
  });

  // State: View Mode ('public' | 'admin')
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');

  // State: Guest Table & Order Tray
  const [tableNumber, setTableNumber] = useState<string>('1');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // State: Modals
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isOrderTrayOpen, setIsOrderTrayOpen] = useState<boolean>(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<CafeMenuItem | null>(null);

  // Fetch menu and info from API on mount
  useEffect(() => {
    let isMounted = true;
    api.getMenuItems().then((items) => {
      if (isMounted && items && items.length > 0) {
        setMenuItems(items);
      }
    });
    api.getCafeInfo().then((info) => {
      if (isMounted && info) {
        setCafeInfo(info);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync menu items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuItems));
    } catch (e) {
      console.error('Error saving menu to localStorage', e);
    }
  }, [menuItems]);

  // Sync cafe info to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CAFE_INFO_STORAGE_KEY, JSON.stringify(cafeInfo));
    } catch (e) {
      console.error('Error saving cafe info to localStorage', e);
    }
  }, [cafeInfo]);

  // Detect query parameters (?table=X or ?view=admin)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get('table');
      if (tableParam) {
        setTableNumber(tableParam);
      }
      const viewParam = params.get('view');
      if (viewParam === 'admin') {
        setViewMode('admin');
      }
    }
  }, []);

  // Smooth scroll helper
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Order tray calculations
  const trayQuantities = orderItems.reduce((acc, curr) => {
    acc[curr.item.id] = curr.quantity;
    return acc;
  }, {} as Record<string, number>);

  const totalItemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = orderItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  // Handlers for Order Tray
  const handleAddItemToTray = (item: CafeMenuItem, quantity: number = 1) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((i) => {
          if (i.item.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems((prev) => prev.filter((i) => i.item.id !== id));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  // Handlers for Admin Management
  const handleToggleAvailability = (id: string) => {
    api.toggleAvailability(id);
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleUpdateMenuItem = (updatedItem: CafeMenuItem) => {
    api.updateMenuItem(updatedItem);
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleAddMenuItem = (newItem: CafeMenuItem) => {
    api.addMenuItem(newItem);
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteMenuItem = (id: string) => {
    api.deleteMenuItem(id);
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    setOrderItems((prev) => prev.filter((item) => item.item.id !== id));
  };

  const handleUpdateCafeInfo = (info: CafeInfo) => {
    api.updateCafeInfo(info);
    setCafeInfo(info);
  };

  const handleResetDefaults = () => {
    if (confirm('Reset Bloom Cafe menu and details to default values?')) {
      api.resetDefaults();
      setMenuItems(initialMenuItems);
      setCafeInfo(initialCafeInfo);
      localStorage.removeItem(MENU_STORAGE_KEY);
      localStorage.removeItem(CAFE_INFO_STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B281B] text-white flex flex-col font-sans selection:bg-[#F4B838] selection:text-black">
      {viewMode === 'admin' ? (
        /* --- ADMIN MANAGEMENT PORTAL --- */
        <AdminPortal
          menuItems={menuItems}
          cafeInfo={cafeInfo}
          onUpdateMenuItem={handleUpdateMenuItem}
          onAddMenuItem={handleAddMenuItem}
          onDeleteMenuItem={handleDeleteMenuItem}
          onToggleAvailability={handleToggleAvailability}
          onUpdateCafeInfo={handleUpdateCafeInfo}
          onResetDefaults={handleResetDefaults}
          onSwitchToPublic={() => setViewMode('public')}
          onOpenQRModal={() => setIsQRModalOpen(true)}
        />
      ) : (
        /* --- PUBLIC DIGITAL MENU & CAFE SANCTUARY VIEW --- */
        <>
          {/* 1. Top Navbar with Emblem & Quick Info */}
          <Navbar
            cafeInfo={cafeInfo}
            orderItemCount={totalItemCount}
            orderTotal={orderTotal}
            onOpenOrderTray={() => setIsOrderTrayOpen(true)}
            onOpenQRModal={() => setIsQRModalOpen(true)}
            onSwitchToAdmin={() => setViewMode('admin')}
            onScrollToSection={handleScrollToSection}
          />

          <main className="flex-1">
            {/* 2. Main Hero Section */}
            <Hero
              cafeInfo={cafeInfo}
              onOpenQRModal={() => setIsQRModalOpen(true)}
              onOpenOrderTray={() => setIsOrderTrayOpen(true)}
              orderItemCount={totalItemCount}
              onScrollToSection={handleScrollToSection}
            />

            {/* 3. Live Cafe Status Ticker */}
            <StatusTicker />

            {/* 4. "Every hour has a table" Time-Slot Grid (Ivory Background) */}
            <HourTableSection
              timeSlots={initialTimeSlots}
              onScrollToMenu={() => handleScrollToSection('digital-menu')}
            />

            {/* 5. Core Digital Menu (Contactless Table Ordering) */}
            <DigitalMenu
              menuItems={menuItems}
              cafeInfo={cafeInfo}
              onAddItemToTray={(item) => handleAddItemToTray(item, 1)}
              trayQuantities={trayQuantities}
              onOpenItemDetail={(item) => setSelectedDetailItem(item)}
            />

            {/* 6. Tobacco Brown Promotional Specials */}
            <PromoCarousel
              onScrollToMenu={() => handleScrollToSection('digital-menu')}
              onOpenQRModal={() => setIsQRModalOpen(true)}
            />

            {/* 7. Location, Hours, & WiFi Bento Section */}
            <FindUsSection
              cafeInfo={cafeInfo}
              onOpenQRModal={() => setIsQRModalOpen(true)}
            />
          </main>

          {/* 8. 4-Column Footer with Bento Contact Cards */}
          <Footer
            cafeInfo={cafeInfo}
            onOpenQRModal={() => setIsQRModalOpen(true)}
            onSwitchToAdmin={() => setViewMode('admin')}
            onScrollToSection={handleScrollToSection}
          />

          {/* 9. Floating Bottom-Right Table Order Pill */}
          <FloatingActionButton
            orderItemCount={totalItemCount}
            orderTotal={orderTotal}
            currencySymbol={cafeInfo.currencySymbol}
            tableNumber={tableNumber}
            onOpenOrderTray={() => setIsOrderTrayOpen(true)}
          />
        </>
      )}

      {/* --- INTERACTIVE MODALS & DRAWERS --- */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        cafeInfo={cafeInfo}
      />

      <OrderTrayDrawer
        isOpen={isOrderTrayOpen}
        onClose={() => setIsOrderTrayOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        cafeInfo={cafeInfo}
        tableNumber={tableNumber}
        onTableNumberChange={setTableNumber}
      />

      <ItemDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        cafeInfo={cafeInfo}
        onAddToTray={handleAddItemToTray}
        currentQuantity={selectedDetailItem ? trayQuantities[selectedDetailItem.id] || 0 : 0}
      />
    </div>
  );
}

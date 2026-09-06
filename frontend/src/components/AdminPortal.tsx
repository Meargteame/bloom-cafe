import React, { useState, useEffect } from 'react';
import { CafeMenuItem, CafeInfo, CategoryType } from '../types';
import { api, BackendOrder } from '../services/api';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Settings, 
  Wifi, 
  Clock, 
  QrCode, 
  AlertCircle,
  ShieldCheck,
  Eye,
  DollarSign,
  ChefHat,
  UtensilsCrossed,
  BarChart3,
  PieChart,
  Grid,
  TrendingUp,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Menu,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { BloomLogo } from './BloomLogo';
import { ConfirmModal } from './ConfirmModal';

interface AdminPortalProps {
  menuItems: CafeMenuItem[];
  cafeInfo: CafeInfo;
  onUpdateMenuItem: (updatedItem: CafeMenuItem) => void;
  onAddMenuItem: (newItem: CafeMenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  onToggleAvailability: (id: string) => void;
  onUpdateCafeInfo: (info: CafeInfo) => void;
  onResetDefaults: () => void;
  onSwitchToPublic: () => void;
  onOpenQRModal: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  menuItems,
  cafeInfo,
  onUpdateMenuItem,
  onAddMenuItem,
  onDeleteMenuItem,
  onToggleAvailability,
  onUpdateCafeInfo,
  onResetDefaults,
  onSwitchToPublic,
  onOpenQRModal,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'analytics' | 'tables' | 'cafe-settings'>('orders');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const [editingItem, setEditingItem] = useState<CafeMenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<CategoryType>('all');
  const [saveToast, setSaveToast] = useState<string>('');
  
  // Custom Confirmation Modals state
  const [itemToDelete, setItemToDelete] = useState<CafeMenuItem | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Live Orders state
  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'preparing' | 'served' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const fetchOrders = () => {
      api.getOrders().then((data) => {
        if (isMounted) setOrders(data);
      });
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleUpdateStatus = (orderId: string, status: BackendOrder['status']) => {
    api.updateOrderStatus(orderId, status).then(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
      showToast(`Order ${orderId.slice(-4)} set to ${status}`);
    });
  };

  const handleSimulateOrder = async () => {
    const randomTable = Math.floor(Math.random() * 12) + 1;
    const randomItems = menuItems.length >= 2 
      ? [menuItems[Math.floor(Math.random() * menuItems.length)], menuItems[Math.floor(Math.random() * menuItems.length)]]
      : menuItems;
    
    const orderPayload = {
      tableNumber: randomTable,
      items: randomItems.map(i => ({ menuItemId: i.id, quantity: 1, price: i.price })),
      totalAmount: randomItems.reduce((acc, curr) => acc + (curr.price || 0), 0),
      customerNote: 'Please serve with extra hot pour-over style!',
    };

    try {
      const placed = await api.placeOrder(orderPayload);
      setOrders((prev) => [placed, ...prev]);
      showToast(`⚡ Live test order placed for Table ${randomTable}!`);
    } catch {
      showToast(`Simulated order for Table ${randomTable}`);
    }
  };

  // Form state for add / edit
  const [formData, setFormData] = useState<Partial<CafeMenuItem>>({
    name: '',
    category: 'coffee',
    price: 250,
    description: '',
    isAvailable: true,
    preparationTime: '10 mins',
    dietary: [],
  });

  // Cafe Settings state
  const [settingsForm, setSettingsForm] = useState<CafeInfo>({ ...cafeInfo });

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3500);
  };

  const handleStartAdd = () => {
    setFormData({
      id: `custom-${Date.now()}`,
      name: '',
      category: 'coffee',
      price: 250,
      description: '',
      isAvailable: true,
      preparationTime: '10 mins',
      dietary: [],
    });
    setIsAddingNew(true);
    setEditingItem(null);
  };

  const handleStartEdit = (item: CafeMenuItem) => {
    setFormData({ ...item });
    setEditingItem(item);
    setIsAddingNew(false);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    if (isAddingNew) {
      const newItem: CafeMenuItem = {
        id: `item-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category || 'coffee',
        price: Number(formData.price) || 250,
        description: formData.description?.trim() || '',
        isAvailable: formData.isAvailable !== undefined ? formData.isAvailable : true,
        preparationTime: formData.preparationTime || '10 mins',
        calories: formData.calories,
        temperature: formData.temperature,
        dietary: formData.dietary || [],
        image: formData.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
      };

      onAddMenuItem(newItem);
      showToast(`Added "${newItem.name}" to menu`);
    } else if (editingItem) {
      const updated: CafeMenuItem = {
        ...editingItem,
        name: formData.name.trim(),
        category: formData.category || editingItem.category,
        price: Number(formData.price) || editingItem.price,
        description: formData.description?.trim() || editingItem.description,
        isAvailable: formData.isAvailable !== undefined ? formData.isAvailable : editingItem.isAvailable,
        preparationTime: formData.preparationTime || editingItem.preparationTime,
        calories: formData.calories,
        temperature: formData.temperature,
        dietary: formData.dietary || [],
        image: formData.image || editingItem.image,
      };

      onUpdateMenuItem(updated);
      showToast(`Updated "${updated.name}"`);
    }

    setIsAddingNew(false);
    setEditingItem(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCafeInfo(settingsForm);
    showToast('Cafe configuration saved');
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.status === statusFilter;
  });

  // Dynamic Metrics
  const totalSalesRevenue = orders
    .filter((o) => o.status === 'completed' || o.status === 'served')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'pending' || o.status === 'preparing'
  ).length;

  const soldOutCount = menuItems.filter((i) => !i.isAvailable).length;

  // Floor plan tables state (12 tables)
  const cafeTables = Array.from({ length: 12 }, (_, idx) => {
    const num = idx + 1;
    const tableOrder = orders.find((o) => o.tableNumber === num && o.status !== 'completed' && o.status !== 'cancelled');
    return {
      tableNumber: num,
      status: tableOrder ? tableOrder.status : 'free',
      activeOrder: tableOrder,
    };
  });

  const navItems = [
    { id: 'orders', label: 'Live Orders KDS', icon: ChefHat, badge: activeOrdersCount ? `${activeOrdersCount}` : undefined },
    { id: 'menu', label: 'Menu Catalog', icon: UtensilsCrossed, badge: `${menuItems.length}` },
    { id: 'analytics', label: 'Sales Intelligence', icon: BarChart3 },
    { id: 'tables', label: 'Floor Plan & QR', icon: Grid, badge: '12 Stands' },
    { id: 'cafe-settings', label: 'Store Config', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0B281B] text-white flex overflow-hidden">
      
      {/* MOBILE OVERLAY BACKDROP */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR NAVIGATION BAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#071E13] border-r border-[#16422E] flex flex-col justify-between transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Sidebar Header & Brand Logo */}
        <div>
          <div className="h-20 px-3 flex items-center justify-between border-b border-[#16422E]">
            {!isSidebarCollapsed ? (
              <div className="flex items-center gap-2 overflow-hidden">
                <BloomLogo size="sm" showSubtitle={false} showText={true} />
                <span className="px-1.5 py-0.5 rounded bg-[#16422E] text-[#F4B838] text-[9px] font-mono font-bold uppercase tracking-wider border border-[#F4B838]/30 shrink-0">
                  STAFF
                </span>
              </div>
            ) : (
              <div className="mx-auto">
                <BloomLogo size="sm" showSubtitle={false} showText={false} />
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg bg-[#0B281B] text-[#8FA597] hover:text-white border border-[#16422E] hover:border-[#F4B838] transition-all shrink-0"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all group ${
                    isActive
                      ? 'bg-[#F4B838] text-black shadow-lg shadow-[#F4B838]/20'
                      : 'text-[#CAD4CD] hover:text-white hover:bg-[#0B281B] border border-transparent hover:border-[#16422E]'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconComponent className={`w-5 h-5 shrink-0 ${isActive ? 'text-black' : 'text-[#F4B838] group-hover:scale-110 transition-transform'}`} />
                    {!isSidebarCollapsed && <span className="truncate text-[11px]">{item.label}</span>}
                  </div>

                  {!isSidebarCollapsed && item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                        isActive
                          ? 'bg-black text-[#F4B838]'
                          : 'bg-[#0B281B] text-[#F4B838] border border-[#16422E]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-3 border-t border-[#16422E] space-y-2">
          {!isSidebarCollapsed ? (
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={handleSimulateOrder}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#7E5229]/40 hover:bg-[#7E5229]/70 text-[#F4B838] border border-[#F4B838]/40 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-[#F4B838]" />
                <span>Simulate Order</span>
              </button>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={onSwitchToPublic}
                  className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl bg-[#0B281B] hover:bg-[#123827] text-white border border-[#16422E] text-[10px] font-bold uppercase transition-all"
                  title="Public Menu"
                >
                  <Eye className="w-3.5 h-3.5 text-[#F4B838]" />
                  <span>Public</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenQRModal}
                  className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl bg-[#0B281B] hover:bg-[#123827] text-[#CAD4CD] hover:text-white border border-[#16422E] text-[10px] font-bold uppercase transition-all"
                  title="Table Stands"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#F4B838]" />
                  <span>Stands</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 flex flex-col items-center">
              <button
                type="button"
                onClick={handleSimulateOrder}
                className="p-2.5 rounded-xl bg-[#7E5229]/40 text-[#F4B838] border border-[#F4B838]/40"
                title="Simulate Order"
              >
                <Zap className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onSwitchToPublic}
                className="p-2.5 rounded-xl bg-[#0B281B] text-white border border-[#16422E]"
                title="Public Menu"
              >
                <Eye className="w-4 h-4 text-[#F4B838]" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN PORTAL VIEWPORT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP APP BAR FOR MAIN VIEWPORT */}
        <header className="bg-[#071E13]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#16422E] px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#0B281B] text-[#F4B838] border border-[#16422E]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-[#F4B838] tracking-[0.2em] uppercase text-[10px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>IDDO KITCHEN & ARTISAN ROASTERY</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-editorial font-bold text-white capitalize">
                {activeTab.replace('-', ' ')} Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B281B] border border-[#16422E] text-xs font-mono text-[#8FA597]">
              <Clock className="w-3.5 h-3.5 text-[#F4B838]" />
              <span>Live Order Monitor Active</span>
            </div>

            <button
              type="button"
              onClick={onSwitchToPublic}
              className="px-4 py-2 rounded-xl bg-[#F4B838] hover:bg-[#E4A82B] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Exit Portal
            </button>
          </div>
        </header>

        {/* Save Toast Notification */}
        {saveToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#071E13] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border-2 border-[#F4B838] animate-bounce">
            <Check className="w-4 h-4 text-[#F4B838]" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* BODY CONTENT AREA */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Executive KPI Bento Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#071E13] p-5 rounded-3xl border border-[#16422E] flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8FA597]">Gross Revenue Today</span>
                <span className="block font-mono text-2xl font-black text-[#F4B838] mt-1">{totalSalesRevenue} {cafeInfo.currencySymbol}</span>
                <span className="text-[10px] text-[#B0C32E] flex items-center gap-1 mt-1 font-mono">
                  <TrendingUp className="w-3 h-3" /> Live MongoDB Sync
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#0B281B] text-[#F4B838] border border-[#16422E] flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#071E13] p-5 rounded-3xl border border-[#16422E] flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8FA597]">Active Kitchen Queue</span>
                <span className="block font-mono text-2xl font-black text-white mt-1">{activeOrdersCount} Table Orders</span>
                <span className="text-[10px] text-[#CAD4CD] flex items-center gap-1 mt-1 font-mono">
                  <Clock className="w-3 h-3 text-[#F4B838]" /> Avg ~4.5m Fulfillment
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#0B281B] text-[#B0C32E] border border-[#16422E] flex items-center justify-center">
                <ChefHat className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#071E13] p-5 rounded-3xl border border-[#16422E] flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8FA597]">Active Menu Catalog</span>
                <span className="block font-mono text-2xl font-black text-white mt-1">{menuItems.length} Offerings</span>
                <span className="text-[10px] text-[#CAD4CD] flex items-center gap-1 mt-1">
                  {menuItems.filter(i => i.dietary?.includes('fasting')).length} Ethiopian Fasting (የጾም)
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#0B281B] text-white border border-[#16422E] flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-[#F4B838]" />
              </div>
            </div>

            <div className="bg-[#071E13] p-5 rounded-3xl border border-[#16422E] flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8FA597]">Sold Out Items</span>
                <span className="block font-mono text-2xl font-black text-red-400 mt-1">{soldOutCount} Unavailable</span>
                <span className="text-[10px] text-[#CAD4CD] flex items-center gap-1 mt-1">
                  {soldOutCount === 0 ? 'Full menu available' : 'Tap switch to restore stock'}
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#0B281B] text-red-400 border border-[#16422E] flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* TAB 1: LIVE ORDERS QUEUE */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#071E13] p-4 sm:p-6 rounded-3xl border border-[#16422E]">
                <div>
                  <h2 className="text-xl font-editorial font-bold text-white flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-[#F4B838]" />
                    Live Digital Kitchen Display System (KDS)
                  </h2>
                  <p className="text-xs text-[#CAD4CD] font-light mt-0.5">
                    Orders placed by customers via table QR codes update automatically every 5 seconds.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSimulateOrder}
                    className="px-4 py-2 bg-[#7E5229] hover:bg-[#684220] text-[#F4B838] border border-[#F4B838]/40 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shrink-0 transition-all"
                  >
                    <Zap className="w-4 h-4 text-[#F4B838]" />
                    <span>+ Test Order</span>
                  </button>

                  {/* Filter Order Status */}
                  <div className="flex items-center gap-1 bg-[#0B281B] p-1 rounded-xl border border-[#16422E] text-xs">
                    {(['all', 'pending', 'preparing', 'served', 'completed'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider text-[10px] transition-colors ${
                          statusFilter === st
                            ? 'bg-[#F4B838] text-black'
                            : 'text-[#CAD4CD] hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="bg-[#071E13] p-12 rounded-3xl border border-[#16422E] text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#0B281B] text-[#F4B838] flex items-center justify-center mx-auto border border-[#16422E]">
                    <ChefHat className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-editorial font-bold text-white">No Active Table Orders</h3>
                  <p className="text-xs text-[#CAD4CD] max-w-sm mx-auto">
                    When customers scan the QR codes at tables 1-12 and submit orders, they will instantly display here.
                  </p>
                  <button
                    type="button"
                    onClick={handleSimulateOrder}
                    className="px-5 py-2.5 bg-[#F4B838] hover:bg-[#E4A82B] text-black rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
                  >
                    Simulate Demo Order
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOrders.map((order) => {
                    const statusColors = {
                      pending: 'bg-amber-950/60 text-amber-300 border-amber-800',
                      preparing: 'bg-blue-950/60 text-blue-300 border-blue-800',
                      served: 'bg-[#123827] text-[#B0C32E] border-[#B0C32E]/40',
                      completed: 'bg-emerald-950/60 text-emerald-300 border-emerald-800',
                      cancelled: 'bg-red-950/60 text-red-400 border-red-800',
                    };

                    return (
                      <div
                        key={order.id}
                        className="bg-[#071E13] rounded-3xl p-5 border border-[#16422E] shadow-xl flex flex-col justify-between space-y-4 hover:border-[#F4B838]/40 transition-all"
                      >
                        <div>
                          {/* Order Card Top Bar */}
                          <div className="flex items-center justify-between pb-3 border-b border-[#16422E]">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-[#F4B838] text-black font-mono font-black text-xs rounded-xl shadow-sm">
                                TABLE {order.tableNumber}
                              </span>
                              <span className="text-[11px] font-mono text-[#8FA597]">
                                #{order.id.slice(-6)}
                              </span>
                            </div>
                            <span
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                                statusColors[order.status] || 'bg-[#0B281B] text-white'
                              }`}
                            >
                              {order.status === 'pending' ? 'RECEIVED' : order.status}
                            </span>
                          </div>

                          {/* Customer note if available */}
                          {order.customerNote && (
                            <div className="mt-3 p-2.5 bg-[#7E5229]/20 border border-[#7E5229]/40 rounded-xl text-xs text-[#F4B838] font-medium italic">
                              "{order.customerNote}"
                            </div>
                          )}

                          {/* Order Items List */}
                          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
                            {order.items.map((item, idx) => {
                              const menuItem = menuItems.find(
                                (m) => String(m.id) === String(item.menuItemId) || m.name.toLowerCase() === String(item.menuItemId).toLowerCase()
                              );
                              const itemTitle = menuItem ? menuItem.name : 'Specialty Cafe Item';
                              const unitPrice = item.price || (menuItem ? menuItem.price : 0) || (order.totalAmount ? Math.round(order.totalAmount / (order.items.length || 1)) : 180);
                              const linePrice = unitPrice * (item.quantity || 1);

                              return (
                                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#16422E]/40">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-md bg-[#0B281B] text-[#F4B838] font-mono font-bold flex items-center justify-center text-[10px] border border-[#16422E]">
                                      {item.quantity || 1}x
                                    </span>
                                    <span className="text-white font-medium">
                                      {itemTitle}
                                    </span>
                                  </div>
                                  <span className="font-mono text-[#F4B838] font-bold">
                                    {linePrice} {cafeInfo.currencySymbol}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Order Footer & Action Controls */}
                        <div className="pt-3 border-t border-[#16422E] space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#8FA597] uppercase tracking-wider font-bold">TOTAL BILL:</span>
                            <span className="font-mono font-extrabold text-base text-[#F4B838]">
                              {order.totalAmount} {cafeInfo.currencySymbol}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {order.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(order.id, 'preparing')}
                                className="col-span-2 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                              >
                                Start Preparing
                              </button>
                            )}

                            {order.status === 'preparing' && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(order.id, 'served')}
                                className="col-span-2 py-2 bg-[#B0C32E] hover:bg-[#9eb027] text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                              >
                                Mark Served to Table
                              </button>
                            )}

                            {order.status === 'served' && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(order.id, 'completed')}
                                className="col-span-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Complete & Close Bill</span>
                              </button>
                            )}

                            {order.status !== 'completed' && order.status !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                                className="col-span-2 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-xl text-[11px] font-bold uppercase tracking-wider border border-red-800 transition-all"
                              >
                                Cancel Order
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MENU CATALOG & INVENTORY */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              {/* Filter and Search Bar */}
              <div className="bg-[#071E13] p-4 sm:p-6 rounded-3xl border border-[#16422E] space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  {/* Search Field */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#8FA597]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search menu items by title, Amharic name, or ingredient..."
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0B281B] text-xs text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleStartAdd}
                    className="px-5 py-2.5 bg-[#F4B838] hover:bg-[#E4A82B] text-black rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Item</span>
                  </button>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {(['all', 'coffee', 'tea', 'bakery', 'brunch', 'toasties', 'desserts'] as CategoryType[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                        filterCategory === cat
                          ? 'bg-[#F4B838] text-black shadow-md'
                          : 'bg-[#0B281B] text-[#CAD4CD] hover:text-white border border-[#16422E]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add / Edit Form Modal Drawer */}
              {(isAddingNew || editingItem) && (
                <div className="bg-[#071E13] rounded-3xl p-6 sm:p-8 border-2 border-[#F4B838] shadow-2xl space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between pb-4 border-b border-[#16422E]">
                    <div>
                      <h2 className="text-2xl font-editorial font-bold text-white">
                        {isAddingNew ? 'Create New Artisan Item' : `Edit "${editingItem?.name}"`}
                      </h2>
                      <p className="text-xs text-[#F4B838] font-mono">
                        Bloom Cafe Digital Menu Catalog Editor
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNew(false);
                        setEditingItem(null);
                      }}
                      className="p-2 rounded-full text-[#8FA597] hover:text-white hover:bg-[#0B281B]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveItem} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                          Item Title (Amharic & English)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. ካራሜል ማኪያቶ (Caramel Macchiato)"
                          className="w-full px-3.5 py-2.5 bg-[#0B281B] text-xs text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                          Category
                        </label>
                        <select
                          value={formData.category || 'coffee'}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryType })}
                          className="w-full px-3.5 py-2.5 bg-[#0B281B] text-xs text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                        >
                          <option value="coffee">Specialty Coffee</option>
                          <option value="tea">Handcrafted Teas</option>
                          <option value="bakery">Fresh Bakery</option>
                          <option value="brunch">All-Day Brunch</option>
                          <option value="toasties">Toasties & Paninis</option>
                          <option value="desserts">Artisan Desserts</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                          Price ({cafeInfo.currencySymbol})
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.price || 0}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 bg-[#0B281B] text-xs text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838] font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                          Preparation Time
                        </label>
                        <input
                          type="text"
                          value={formData.preparationTime || '10 mins'}
                          onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                          placeholder="e.g. 5-8 mins"
                          className="w-full px-3.5 py-2.5 bg-[#0B281B] text-xs text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                        Description & Flavor Profile
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Rich espresso, steamed whole milk, house caramel drizzle..."
                        className="w-full px-3.5 py-2.5 bg-[#0B281B] text-xs text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                        Image URL (Unsplash or custom asset)
                      </label>
                      <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3.5 py-2.5 bg-[#0B281B] text-xs text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#16422E]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingNew(false);
                          setEditingItem(null);
                        }}
                        className="px-5 py-2.5 bg-[#0B281B] hover:bg-[#16422E] text-[#CAD4CD] rounded-xl text-xs font-bold uppercase tracking-wider border border-[#16422E]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#F4B838] hover:bg-[#E4A82B] text-black rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
                      >
                        {isAddingNew ? 'Create Item' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Menu Items Table */}
              <div className="bg-[#071E13] rounded-3xl border border-[#16422E] overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B281B] text-[#CAD4CD] font-bold uppercase tracking-wider border-b border-[#16422E]">
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6">Item & Category</th>
                        <th className="py-3.5 px-4 font-mono">Price</th>
                        <th className="py-3.5 px-4">Stock Availability</th>
                        <th className="py-3.5 px-4">Dietary Tags</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#16422E]">
                      {filteredItems.map((item) => {
                        const nameMatch = item.name.match(/^(.*?)\s*\((.*?)\)$/);
                        const amharicName = nameMatch ? nameMatch[1].trim() : null;
                        const mainTitle = nameMatch ? nameMatch[2].trim() : item.name;

                        return (
                          <tr key={item.id} className="hover:bg-[#0B281B]/50 transition-colors">
                            <td className="py-4 px-4 sm:px-6">
                              {amharicName && (
                                <span className="text-xs text-[#8FA597] font-medium font-sans block mb-0.5">
                                  {amharicName}
                                </span>
                              )}
                              <div className="font-editorial font-bold text-base text-white">
                                {mainTitle}
                              </div>
                              <div className="text-[11px] text-[#CAD4CD] max-w-xs truncate font-light">
                                {item.description}
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8FA597]">
                                {item.category}
                              </span>
                            </td>

                            <td className="py-4 px-4 font-mono font-bold text-sm text-[#F4B838]">
                              {item.price} {cafeInfo.currencySymbol}
                            </td>

                            <td className="py-4 px-4">
                              <button
                                type="button"
                                onClick={() => onToggleAvailability(item.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                                  item.isAvailable
                                    ? 'bg-[#123827] text-[#B0C32E] border border-[#B0C32E]/30'
                                    : 'bg-red-950/40 text-red-300 border border-red-800'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? 'bg-[#B0C32E] animate-ping' : 'bg-red-500'}`} />
                                <span>{item.isAvailable ? 'In Stock' : 'Sold Out'}</span>
                              </button>
                            </td>

                            <td className="py-4 px-4">
                              <div className="flex flex-wrap gap-1 max-w-[150px]">
                                {item.dietary?.map((d) => (
                                  <span key={d} className="px-1.5 py-0.5 rounded bg-[#0B281B] text-[10px] text-[#CAD4CD] border border-[#16422E]">
                                    {d}
                                  </span>
                                ))}
                              </div>
                            </td>

                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleStartEdit(item)}
                                  className="p-1.5 rounded-lg bg-[#0B281B] text-[#CAD4CD] hover:text-[#F4B838] border border-[#16422E] hover:border-[#F4B838]"
                                  title="Edit item"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setItemToDelete(item)}
                                  className="p-1.5 rounded-lg bg-[#0B281B] text-[#CAD4CD] hover:text-red-400 border border-[#16422E] hover:border-red-500 transition-colors"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SALES INTELLIGENCE & ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-[#071E13] p-6 rounded-3xl border border-[#16422E] shadow-xl">
                <h2 className="text-2xl font-editorial font-bold text-white mb-2 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-[#F4B838]" />
                  Sales Performance & Roastery Analytics
                </h2>
                <p className="text-xs text-[#CAD4CD] font-light">
                  Real-time breakdown of sales volume, customer order frequency, and product popularity.
                </p>

                {/* Best Sellers & Category Breakdown Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  {/* Best Sellers Leaderboard */}
                  <div className="bg-[#0B281B] p-5 rounded-2xl border border-[#16422E] space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#F4B838] flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Best Selling Offerings
                    </h3>
                    <div className="space-y-3">
                      {menuItems.slice(0, 5).map((item, idx) => (
                        <div key={item.id} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white font-medium">
                              #{idx + 1} {item.name}
                            </span>
                            <span className="font-mono text-[#F4B838] font-bold">
                              {item.price} {cafeInfo.currencySymbol}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-[#071E13] rounded-full overflow-hidden border border-[#16422E]">
                            <div
                              className="h-full bg-gradient-to-r from-[#7E5229] via-[#F4B838] to-[#B0C32E] rounded-full"
                              style={{ width: `${100 - idx * 15}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Revenue Distribution */}
                  <div className="bg-[#0B281B] p-5 rounded-2xl border border-[#16422E] space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#F4B838] flex items-center gap-2">
                      <PieChart className="w-4 h-4" /> Category Distribution
                    </h3>
                    <div className="space-y-3">
                      {[
                        { cat: 'Specialty Coffee', pct: 45, color: 'bg-[#F4B838]' },
                        { cat: 'Fresh Bakery & Pastries', pct: 25, color: 'bg-[#B0C32E]' },
                        { cat: 'All-Day Brunch', pct: 18, color: 'bg-[#7E5229]' },
                        { cat: 'Handcrafted Teas & Drinks', pct: 12, color: 'bg-emerald-500' },
                      ].map((c) => (
                        <div key={c.cat} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#CAD4CD]">{c.cat}</span>
                            <span className="font-mono text-white font-bold">{c.pct}%</span>
                          </div>
                          <div className="w-full h-2 bg-[#071E13] rounded-full overflow-hidden border border-[#16422E]">
                            <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE FLOOR PLAN & TABLE STAND QR */}
          {activeTab === 'tables' && (
            <div className="space-y-6">
              <div className="bg-[#071E13] p-6 rounded-3xl border border-[#16422E] shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-editorial font-bold text-white flex items-center gap-2">
                      <Grid className="w-6 h-6 text-[#F4B838]" />
                      Interactive Floor Plan & Table Stand QR Codes
                    </h2>
                    <p className="text-xs text-[#CAD4CD] font-light mt-0.5">
                      Click any table card to generate its custom QR stand or view active order status.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenQRModal}
                    className="px-5 py-2.5 bg-[#F4B838] hover:bg-[#E4A82B] text-black rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Print All Table Stands</span>
                  </button>
                </div>

                {/* 12 Tables Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {cafeTables.map((table) => {
                    const isOccupied = table.status !== 'free';
                    return (
                      <div
                        key={table.tableNumber}
                        onClick={onOpenQRModal}
                        className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                          isOccupied
                            ? 'bg-[#7E5229]/20 border-[#F4B838]/60 shadow-lg shadow-black/60'
                            : 'bg-[#0B281B] border-[#16422E] hover:border-[#F4B838]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-[#071E13] text-[#F4B838] font-mono font-bold text-xs rounded-xl border border-[#16422E]">
                            Table {table.tableNumber}
                          </span>
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              isOccupied ? 'bg-[#F4B838] animate-ping' : 'bg-[#B0C32E]'
                            }`}
                          />
                        </div>

                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#CAD4CD]">
                            {isOccupied ? 'Active Customer Order' : 'Table Ready'}
                          </span>
                          {table.activeOrder && (
                            <span className="block font-mono text-xs text-[#F4B838] font-extrabold mt-1">
                              {table.activeOrder.totalAmount} {cafeInfo.currencySymbol}
                            </span>
                          )}
                        </div>

                        <div className="pt-2 border-t border-[#16422E]/60 flex items-center justify-between text-[11px] text-[#8FA597]">
                          <span>Scan Stand QR</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#F4B838]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CAFE CONFIGURATION */}
          {activeTab === 'cafe-settings' && (
            <div className="bg-[#071E13] rounded-3xl p-6 sm:p-8 border border-[#16422E] shadow-xl space-y-6">
              <h2 className="text-2xl font-editorial font-bold text-white pb-3 border-b border-[#16422E]">
                General Cafe Configuration
              </h2>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                      Cafe Title & Subtitle
                    </label>
                    <input
                      type="text"
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                      Currency Symbol
                    </label>
                    <input
                      type="text"
                      value={settingsForm.currencySymbol}
                      onChange={(e) => setSettingsForm({ ...settingsForm, currencySymbol: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838] font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                      Street Address & Location
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                      Free Guest Wi-Fi Password
                    </label>
                    <input
                      type="text"
                      value={settingsForm.wifiPassword}
                      onChange={(e) => setSettingsForm({ ...settingsForm, wifiPassword: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                    Daily Roaster Announcement Banner
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcement}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                    placeholder="e.g. Fresh Ethiopian batch ready on bar..."
                    className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#16422E]">
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="px-4 py-2 bg-[#0B281B] hover:bg-[#123827] text-red-400 rounded-xl text-xs font-bold uppercase tracking-wider border border-[#16422E] transition-colors"
                  >
                    Reset To Defaults
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#F4B838] hover:bg-[#E4A82B] text-black rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Delete Item Confirmation Modal */}
      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Remove Menu Item"
        message={
          itemToDelete
            ? `Are you sure you want to delete "${itemToDelete.name}" from the Bloom Cafe active menu catalog? This action cannot be undone.`
            : ''
        }
        confirmText="Delete Item"
        cancelText="Keep Item"
        isDanger={true}
        onConfirm={() => {
          if (itemToDelete) {
            onDeleteMenuItem(itemToDelete.id);
            showToast(`Deleted "${itemToDelete.name}"`);
            setItemToDelete(null);
          }
        }}
        onCancel={() => setItemToDelete(null)}
      />

      {/* Reset Defaults Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetConfirm}
        title="Reset All Cafe Settings"
        message="Are you sure you want to reset all Bloom Cafe menu items, cafe metadata, and hours back to factory defaults? Any unsaved custom items will be restored."
        confirmText="Reset Defaults"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={() => {
          onResetDefaults();
          showToast('Cafe settings reset to defaults');
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};

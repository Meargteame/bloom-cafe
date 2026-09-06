import React, { useState, useEffect } from 'react';
import { CafeMenuItem, CafeInfo, CategoryType, DietaryTag } from '../types';
import { api, BackendOrder } from '../services/api';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Settings, 
  RefreshCw, 
  Wifi, 
  Clock, 
  QrCode, 
  AlertCircle,
  ShieldCheck,
  Eye,
  DollarSign,
  ChefHat,
  UtensilsCrossed
} from 'lucide-react';
import { BloomLogo } from './BloomLogo';

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
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'cafe-settings'>('menu');
  const [editingItem, setEditingItem] = useState<CafeMenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<CategoryType>('all');
  const [saveToast, setSaveToast] = useState<string>('');

  // Live Orders state
  const [orders, setOrders] = useState<BackendOrder[]>([]);

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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
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
        calories: formData.calories || editingItem.calories,
        temperature: formData.temperature || editingItem.temperature,
        dietary: formData.dietary || editingItem.dietary,
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
    showToast('Cafe settings updated successfully');
  };

  // Calculations for KPI Analytics Bento
  const totalSalesRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status === 'received' || o.status === 'preparing').length;
  const soldOutCount = menuItems.filter((i) => !i.isAvailable).length;

  const filteredItems = menuItems.filter((item) => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleDietaryTag = (tag: DietaryTag) => {
    const current = formData.dietary || [];
    if (current.includes(tag)) {
      setFormData({ ...formData, dietary: current.filter((t) => t !== tag) });
    } else {
      setFormData({ ...formData, dietary: [...current, tag] });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B281B] text-white pb-16">
      {/* Admin Top Navigation */}
      <header className="bg-[#071E13] sticky top-0 z-40 shadow-xl border-b border-[#16422E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BloomLogo size="sm" showSubtitle={false} />
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#16422E]">
              <span className="px-2.5 py-1 rounded-md bg-[#16422E] text-[#F4B838] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border border-[#F4B838]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F4B838]" />
                Staff Admin Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onSwitchToPublic}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F4B838] hover:bg-[#E4A82B] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Back to Public Menu</span>
            </button>

            <button
              type="button"
              onClick={onOpenQRModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B281B] hover:bg-[#123827] text-white border border-[#16422E] hover:border-[#F4B838] text-xs font-bold uppercase tracking-wider transition-all"
            >
              <QrCode className="w-3.5 h-3.5 text-[#F4B838]" />
              <span className="hidden sm:inline">Table QR Codes</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Alert */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071E13] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border-2 border-[#F4B838] animate-bounce">
          <Check className="w-4 h-4 text-[#F4B838]" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#16422E]">
          <div>
            <div className="flex items-center gap-2 text-[#F4B838] tracking-[0.24em] uppercase text-xs font-bold mb-1">
              <span>MANAGEMENT CONSOLE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#FAF8F5]">
              Bloom Cafe Operations
            </h1>
            <p className="text-xs text-[#CAD4CD] mt-1 font-light">
              Toggle live item availability, update prices, edit details, or change daily announcements.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-2 bg-[#071E13] p-1.5 rounded-xl border border-[#16422E]">
            <button
              type="button"
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'menu'
                  ? 'bg-[#F4B838] text-black shadow-md'
                  : 'text-[#CAD4CD] hover:text-white'
              }`}
            >
              Menu Offerings ({menuItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#F4B838] text-black shadow-md'
                  : 'text-[#CAD4CD] hover:text-white'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Live Orders ({orders.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cafe-settings')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'cafe-settings'
                  ? 'bg-[#F4B838] text-black shadow-md'
                  : 'text-[#CAD4CD] hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Cafe Info</span>
            </button>
          </div>
        </div>

        {/* KPI Analytics Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#071E13] p-4 rounded-2xl border border-[#16422E] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8FA597]">Total Sales Volume</span>
              <span className="block font-mono text-xl font-extrabold text-[#F4B838] mt-1">{totalSalesRevenue} {cafeInfo.currencySymbol}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] text-[#F4B838] border border-[#16422E] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#071E13] p-4 rounded-2xl border border-[#16422E] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8FA597]">Active Kitchen Queue</span>
              <span className="block font-mono text-xl font-extrabold text-white mt-1">{activeOrdersCount} Orders</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] text-[#B0C32E] border border-[#16422E] flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#071E13] p-4 rounded-2xl border border-[#16422E] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8FA597]">Catalog Items</span>
              <span className="block font-mono text-xl font-extrabold text-white mt-1">{menuItems.length} Offerings</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] text-white border border-[#16422E] flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-[#F4B838]" />
            </div>
          </div>

          <div className="bg-[#071E13] p-4 rounded-2xl border border-[#16422E] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8FA597]">Out of Stock</span>
              <span className="block font-mono text-xl font-extrabold text-red-400 mt-1">{soldOutCount} Items</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] text-red-400 border border-[#16422E] flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {activeTab === 'menu' ? (
          /* MENU MANAGEMENT TAB */
          <div className="space-y-6">
            {/* Quick Action & Filter Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {(['all', 'coffee', 'tea', 'bakery', 'brunch', 'sandwiches', 'desserts'] as CategoryType[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      filterCategory === cat
                        ? 'bg-[#B0C32E] text-[#071E13]'
                        : 'bg-[#071E13] text-[#A8BAAE] border border-[#16422E] hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search item name..."
                  className="px-3 py-2 bg-[#071E13] text-xs text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838] placeholder-[#6E887B]"
                />
                <button
                  type="button"
                  onClick={handleStartAdd}
                  className="px-4 py-2 rounded-xl bg-[#F4B838] hover:bg-[#E4A82B] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Item</span>
                </button>
              </div>
            </div>

            {/* Modal: Add or Edit Item */}
            {(isAddingNew || editingItem) && (
              <div className="bg-[#071E13] rounded-3xl p-6 sm:p-8 border-2 border-[#F4B838] shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#16422E]">
                  <h2 className="text-xl font-editorial font-bold text-white">
                    {isAddingNew ? 'Add New Menu Item' : `Edit "${editingItem?.name}"`}
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNew(false);
                      setEditingItem(null);
                    }}
                    className="p-1 rounded-lg text-[#8FA597] hover:text-white hover:bg-[#16422E]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveItem} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Item Name */}
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                        Item Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Pistachio Cardamom Latte"
                        className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category || 'coffee'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                      >
                        <option value="coffee">Coffee</option>
                        <option value="tea">Teas & Coolers</option>
                        <option value="bakery">Artisan Bakery</option>
                        <option value="brunch">All-Day Brunch</option>
                        <option value="sandwiches">Toasties & Sandwiches</option>
                        <option value="desserts">Sweet Treats</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Price */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                        Price ({cafeInfo.currencySymbol}) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price ?? ''}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-[#0B281B] text-sm font-mono text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                      />
                    </div>

                    {/* Prep Time */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                        Prep Time
                      </label>
                      <input
                        type="text"
                        value={formData.preparationTime || ''}
                        onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                        placeholder="e.g. 4 mins"
                        className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                      />
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                        Initial Stock Status
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
                          formData.isAvailable
                            ? 'bg-[#123827] text-[#B0C32E] border-[#B0C32E]/40'
                            : 'bg-red-950/40 text-red-300 border-red-800'
                        }`}
                      >
                        {formData.isAvailable ? '✓ In Stock' : '✗ Sold Out'}
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                      Description & Flavor Profile
                    </label>
                    <textarea
                      rows={2}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe ingredients, origins, notes..."
                      className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                    />
                  </div>

                  {/* Dietary tags */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-2">
                      Dietary Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(['vegan', 'vegetarian', 'gluten-free', 'popular', 'chef-choice'] as DietaryTag[]).map((tag) => {
                        const isChecked = formData.dietary?.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleDietaryTag(tag)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors border ${
                              isChecked
                                ? 'bg-[#F4B838] text-black border-[#F4B838] font-bold'
                                : 'bg-[#0B281B] text-[#CAD4CD] border-[#16422E]'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-[#16422E]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNew(false);
                        setEditingItem(null);
                      }}
                      className="px-4 py-2 bg-[#0B281B] text-[#CAD4CD] hover:text-white rounded-xl text-xs font-bold uppercase"
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

            {/* Menu Items Table List */}
            <div className="bg-[#071E13] rounded-3xl border border-[#16422E] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B281B] text-[#CAD4CD] font-bold uppercase tracking-wider border-b border-[#16422E]">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Item & Category</th>
                      <th className="py-3.5 px-4 font-mono">Price</th>
                      <th className="py-3.5 px-4">Stock Status</th>
                      <th className="py-3.5 px-4">Dietary</th>
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
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
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
                              onClick={() => {
                                if (confirm(`Remove "${item.name}" from Bloom Cafe menu?`)) {
                                  onDeleteMenuItem(item.id);
                                  showToast(`Deleted "${item.name}"`);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-[#0B281B] text-[#CAD4CD] hover:text-red-400 border border-[#16422E] hover:border-red-500"
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
        ) : (
          /* CAFE SETTINGS TAB */
          <div className="bg-[#071E13] rounded-3xl p-6 sm:p-8 border border-[#16422E] shadow-xl space-y-6">
            <h2 className="text-2xl font-editorial font-bold text-white pb-3 border-b border-[#16422E]">
              General Cafe Configuration
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                    Cafe Name
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
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.hours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B281B] text-sm text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                    Guest WiFi SSID
                  </label>
                  <input
                    type="text"
                    value={settingsForm.wifiName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, wifiName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B281B] text-sm font-mono text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                    WiFi Password
                  </label>
                  <input
                    type="text"
                    value={settingsForm.wifiPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, wifiPassword: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B281B] text-sm font-mono text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
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
                  onClick={onResetDefaults}
                  className="px-4 py-2 bg-[#0B281B] hover:bg-[#123827] text-red-400 rounded-xl text-xs font-bold uppercase tracking-wider border border-[#16422E]"
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
  );
};

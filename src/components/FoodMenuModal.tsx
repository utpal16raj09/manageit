import React, { useState, useEffect } from 'react';
import { X, Save, Utensils } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

interface FoodMenuModalProps {
  locationId: string;
  onClose: () => void;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const FoodMenuModal: React.FC<FoodMenuModalProps> = ({ locationId, onClose }) => {
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app with API integration, this would fetch from /api/locations/:locationId/menu
    // For now we initialize empty state for all 7 days
    const initialMenus = DAYS.map((day, index) => ({
      dayOfWeek: index,
      breakfast: '',
      lunch: '',
      dinner: ''
    }));
    setMenus(initialMenus);
  }, [locationId]);

  const handleChange = (dayIndex: number, field: 'breakfast' | 'lunch' | 'dinner', value: string) => {
    setMenus(prev => {
      const newMenus = [...prev];
      newMenus[dayIndex] = { ...newMenus[dayIndex], [field]: value };
      return newMenus;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    // Real app: PUT to /api/locations/:locationId/menu
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012169]/60 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#012169]">Weekly Food Menu</h3>
              <p className="text-sm font-semibold text-slate-500">Manage the weekly meal schedule</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 text-[#012169] hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {menus.map((menu, index) => (
            <div key={index} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
              <h4 className="font-extrabold text-[#003087] text-lg">{DAYS[index]}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#012169] mb-1.5 uppercase tracking-wider">Breakfast</label>
                  <input
                    type="text"
                    value={menu.breakfast}
                    onChange={(e) => handleChange(index, 'breakfast', e.target.value)}
                    placeholder="e.g. Idli Sambar"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:border-[#009cde]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#012169] mb-1.5 uppercase tracking-wider">Lunch</label>
                  <input
                    type="text"
                    value={menu.lunch}
                    onChange={(e) => handleChange(index, 'lunch', e.target.value)}
                    placeholder="e.g. Rice, Dal, Sabzi"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:border-[#009cde]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#012169] mb-1.5 uppercase tracking-wider">Dinner</label>
                  <input
                    type="text"
                    value={menu.dinner}
                    onChange={(e) => handleChange(index, 'dinner', e.target.value)}
                    placeholder="e.g. Roti, Paneer"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:border-[#009cde]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white rounded-b-3xl flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#009cde] hover:bg-[#0080b8] text-white font-extrabold shadow-sm flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-70"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Weekly Menu'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

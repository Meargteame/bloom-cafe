import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Check, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [date, setDate] = useState<string>('Today');
  const [time, setTime] = useState<string>('20:00');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [booked, setBooked] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0B281B] border border-[#1C4E37] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#16422E] flex items-center justify-between bg-[#082015]">
          <div>
            <span className="text-xs font-bold tracking-[0.24em] text-[#F4B838] uppercase block mb-1">
              RESERVATIONS & VISIT
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white">
              Book a Table
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#113825] hover:bg-[#1A4E35] flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {booked ? (
          <div className="p-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#F4B838] text-[#0B281B] flex items-center justify-center mx-auto shadow-lg">
              <Check size={32} strokeWidth={2.5} />
            </div>
            <h3 className="font-editorial text-4xl text-[#FAF8F5]">
              Table Reserved!
            </h3>
            <p className="text-[#CAD7CF] text-sm leading-relaxed max-w-md mx-auto">
              We look forward to hosting you for {guests} guests at {time} on {date}. Your table will be held for 20 minutes past reservation time.
            </p>
            <div className="p-4 bg-[#082015] rounded-2xl border border-[#164430] text-xs text-[#A9BCB0] space-y-1 text-left max-w-xs mx-auto">
              <p>📍 Semay Tower, Bole Wollo Sefer</p>
              <p>🅿️ On-site complimentary parking</p>
              <p className="text-[#F4B838] font-medium">📞 Direct: +251 98 722 2226</p>
            </div>
            <button
              onClick={() => {
                setBooked(false);
                onClose();
              }}
              className="px-8 py-3 bg-[#F4B838] text-[#0B281B] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#e4a82b] transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[75vh]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                  Date
                </label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F4B838]"
                >
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Thursday (Jazz Night)">Thursday (Jazz Night)</option>
                  <option value="Friday (Buffet)">Friday (Buffet Day)</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                  Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F4B838]"
                >
                  <option value="12:00">12:00 (Buffet)</option>
                  <option value="13:30">13:30 (Buffet)</option>
                  <option value="16:00">16:00 (Coffee & Pastry)</option>
                  <option value="17:00">17:00 (Shawarma Fires Up)</option>
                  <option value="19:00">19:00 (Dinner)</option>
                  <option value="20:30">20:30 (Dinner)</option>
                  <option value="22:00">22:00 (Late Night)</option>
                  <option value="01:00">01:00 (Late Night)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                Number of Guests
              </label>
              <div className="flex gap-2">
                {[1, 2, 4, 6, 8, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      guests === num
                        ? 'border-[#F4B838] bg-[#F4B838] text-[#0B281B]'
                        : 'border-[#184531] bg-[#082015] text-white hover:border-[#225C42]'
                    }`}
                  >
                    {num}{num === 12 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                Contact Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F4B838]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+251 91 234 5678"
                className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F4B838]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                Special Requests (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Outdoor terrace, quiet corner, high chair, birthday..."
                className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F4B838]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#F4B838] hover:bg-[#e4a82b] text-[#0B281B] font-bold text-sm tracking-wider uppercase rounded-full transition-all cursor-pointer shadow-lg"
              >
                CONFIRM TABLE RESERVATION
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
